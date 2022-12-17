import sys
import logging
import traceback

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from consts import RequestBody
from find_route import Solver


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
)


@app.post("/solve")
async def solve(request: RequestBody):
    try:
        solver = Solver()
        solver.solve_vrp(
            request.start_time,
            [request.start] + request.waypoints,
            # [request.start] + request.waypoints + [request.goal],
        )
        return solver.asdict()
    except Exception:
        t, v, tb = sys.exc_info()
        logging.error(traceback.format_exception(t, v, tb))
        return {"status": "error", "error": traceback.format_exception(t, v, tb)}
