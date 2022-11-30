import numpy as np
import datetime as dt
from datetime import timedelta

from ortools.constraint_solver import pywrapcp  # , routing_enums_pb2

from consts import WayPoint, gmaps, create_datetime, logger


class Solver:
    def __init__(self) -> None:
        self.routes = []
        # self.goal = None
        self.total_time = None

    def asdict(self) -> dict:
        return {
            "status": "success",
            "total_time": self.total_time,
            # "goal": self.goal,
            "routes": self.routes,
        }

    def create_time_matrix(self, step_points: list[WayPoint]):
        n = len(step_points)
        arr = np.zeros((n, n))
        items = [sp.address for sp in step_points]
        split_arrs = np.array_split(items, (n // 10) + 1)
        split_arrs_len = [len(a) for a in split_arrs]
        for i, a in enumerate(split_arrs):
            for j, b in enumerate(split_arrs):
                resp = gmaps.distance_matrix(
                    list(a),
                    list(b),
                )
                for k, r in enumerate(resp["rows"]):
                    for l, c in enumerate(r["elements"]):
                        p, q = (
                            sum(split_arrs_len[:i]) + k,
                            sum(split_arrs_len[:j]) + l,
                        )
                        if p == q:
                            continue
                        arr[p][q] = step_points[p].staying_min + int(c["duration"]["value"] / 60)  # sec -> min
        return arr.astype(int)

    def diff_min(self, end: dt.datetime, start: dt.datetime) -> int:
        return int((end - start).total_seconds() / 60)

    def create_time_windows(self, start_time: dt.datetime, step_points: list[WayPoint]):
        # 滞在先の見積診察時間を，滞在可能時間帯から予め引いておく
        return [
            (
                self.diff_min(create_datetime(sp.start_time), start_time),
                self.diff_min(create_datetime(sp.end_time) - timedelta(minutes=sp.staying_min), start_time),
            )
            for sp in step_points
        ]

    # Stores the data for the problem.
    def create_data_model(self, start_time: dt.datetime, end_time: dt.datetime, step_points: list[WayPoint]):
        data = {}
        data["sp"] = step_points
        data["start_time"] = start_time
        data["depot_opening_time"] = self.diff_min(end_time, start_time)
        data["time_matrix"] = self.create_time_matrix(step_points)
        # https://developers.google.com/optimization/reference/python/constraint_solver/pywrapcp#intvar
        data["time_windows"] = self.create_time_windows(start_time, step_points)
        data["vehicles"] = [{"path_color": "#ed1c24"}]
        data["depot"] = 0
        return data

    def print_solution(self, data, manager, routing, solution):
        time_dimension = routing.GetDimensionOrDie("Time")
        self.total_time = 0
        for vehicle_id in range(len(data["vehicles"])):
            index = routing.Start(vehicle_id)
            # st.write("Route for vehicle", vehicle_id)
            while not routing.IsEnd(index):
                sp = data["sp"][manager.IndexToNode(index)]
                time_var = time_dimension.CumulVar(index)
                self.routes += [{
                    "id": sp.id,
                    "name": sp.name,
                    "predict_min_time": data["start_time"] + timedelta(minutes=solution.Min(time_var)),
                    "predict_max_time": None if solution.Min(time_var) == solution.Max(time_var) else data["start_time"] + timedelta(minutes=solution.Max(time_var)),
                }]
                index = solution.Value(routing.NextVar(index))
            time_var = time_dimension.CumulVar(index)
            self.goal = {
                "id": data["sp"][0].id,
                "name": data["sp"][0].name,
                "predict_min_time": data["start_time"] + timedelta(minutes=solution.Min(time_var)),
            }
            self.total_time += solution.Min(time_var)

    # Solve the VRP with time windows.
    def solve_vrp(self, start_time: dt.time, step_points: list[WayPoint]):
        assert len(step_points) > 0, "There is no step point."

        # Instantiate the data problem.
        start_time = create_datetime(start_time)
        end_time = create_datetime("23:59:59", fromisoformat=True)

        data = self.create_data_model(start_time, end_time, step_points)

        # Create the routing index manager.
        manager = pywrapcp.RoutingIndexManager(len(data["time_matrix"]), len(data["vehicles"]), data["depot"])

        # Create Routing Model.
        routing = pywrapcp.RoutingModel(manager)

        # Create and register a transit callback.
        def time_callback(from_index, to_index):
            """Returns the travel time between the two nodes."""
            # Convert from routing variable Index to time matrix NodeIndex.
            from_node = manager.IndexToNode(from_index)
            to_node = manager.IndexToNode(to_index)
            return data["time_matrix"][from_node][to_node]

        transit_callback_index = routing.RegisterTransitCallback(time_callback)

        # Define cost of each arc.
        routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

        # Add Time Windows constraint.
        dimension_name = "Time"
        routing.AddDimension(
            transit_callback_index,
            data["depot_opening_time"],  # allow waiting time [min]
            data["depot_opening_time"],  # maximum time [min] per vehicle until return
            True,  # Force start cumul to zero.
            dimension_name,
        )
        time_dimension = routing.GetDimensionOrDie(dimension_name)
        # Add time window constraints for each location except depot.
        for location_idx, time_window in enumerate(data["time_windows"]):
            if location_idx == data["depot"]:
                continue
            index = manager.NodeToIndex(location_idx)
            time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])
        # Add time window constraints for each vehicle start node.
        depot_idx = data["depot"]
        for vehicle_id in range(len(data["vehicles"])):
            index = routing.Start(vehicle_id)
            time_dimension.CumulVar(index).SetRange(
                data["time_windows"][depot_idx][0], data["time_windows"][depot_idx][1]
            )

        # Instantiate route start and end times to produce feasible times.
        for i in range(len(data["vehicles"])):
            routing.AddVariableMinimizedByFinalizer(time_dimension.CumulVar(routing.Start(i)))
            routing.AddVariableMinimizedByFinalizer(time_dimension.CumulVar(routing.End(i)))

        # Add SpanCost to minimize total wait time. See https://stackoverflow.com/questions/62411546/google-or-tools-minimize-total-time
        time_dimension.SetGlobalSpanCostCoefficient(1)

        # Setting first solution heuristic.
        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        # search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.AUTOMATIC

        # Solve the problem.
        solution = routing.SolveWithParameters(search_parameters)

        # Print solution on console.
        if solution:
            self.print_solution(data, manager, routing, solution)
        else:
            raise Exception("Not found the solution")
            # st.warning(data["time_matrix"])  # for debug
        return solution

    # def sort_data(self, ref):
    #     doc = ref.get()
    #     if doc.exists:
    #         return {k: v for k, v in sorted(doc.to_dict().items(), key=lambda x: x[1]["timestamp"])}
    #     else:
    #         return None
