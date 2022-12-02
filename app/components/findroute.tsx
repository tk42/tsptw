// (1) import Layer
import React, { useState } from 'react'
import Contact from '../interfaces/contact'
import Route from '../interfaces/route'
import DatetimeForm from './datetime-form'
import { contact2waypoint } from '../lib/util'
import Timeline from './timeline'
import { State, Action } from '../lib/select-contact-context'


// (2) Types Layer
export type ContainerProps = {
    contacts?: Contact[]
    state: State
    dispatch: React.Dispatch<Action>
}
type Props = {
    startTime: string
    setStartTime: React.Dispatch<React.SetStateAction<string>>
    route: Route[]
    setRoute: React.Dispatch<React.SetStateAction<Route[]>>
} & ContainerProps

function disableCondition(props: Props) {
    if (props.state.startId === undefined || props.state.wayPointIds === undefined || props.contacts === undefined) {
        return true
    }
    if (props.state.wayPointIds.size === 0) {
        return true
    }
    if (props.contacts.length === 0) {
        return true
    }
    if (props.state.wayPointIds.size === 1 && props.state.wayPointIds.has(props.state.startId)) {
        return true
    }
    return false
}

// (3) Define Global Constants


// (4) DOM Layer
const Component: React.FC<Props> = props => (
    <>
        <div className="mt-4 px-4 sm:ml-4">
            <p>
                <span className="text-2xl font-bold">最短経路探索</span>
            </p>
            <p>
                <span className="text-sm text-gray-700">出発地点を「始」の列から1箇所選択してください</span>
            </p>
            <p>
                <span className="text-sm text-gray-700">経由地点を「経」の列から必要なだけ選択してください</span>
            </p>
            <div className="mx-auto flex flex-start">
                <DatetimeForm
                    caption="出発時刻"
                    id="startTime"
                    name="startTime"
                    type="time"
                    placeholder={props.startTime}
                    setDatetime={props.setStartTime}
                />
            </div>
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:bg-gray-300"
                disabled={disableCondition({ ...props })}
                onClick={() => fetch('/api/find', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "start_time": props.startTime,
                        "start": contact2waypoint(props.contacts.find((person) => person.id === props.state.startId)),
                        "goal": contact2waypoint(props.contacts.find((person) => person.id === props.state.startId)),
                        "waypoints": props.contacts.filter((contact) => (contact.id !== props.state.startId && props.state.wayPointIds.has(contact.id))).map((contact) => contact2waypoint(contact))
                    }),
                }).then(async (res) => {
                    const json = await res.json()
                    if (json.status === "error") {
                        alert("解が見つかりませんでした")
                        console.warn("error", json.error)
                        return
                    }
                    // console.log("result.json:", json)
                    const result = {
                        "status": json.status,
                        "total_time": json.total_time,
                        "routes": json.routes,
                    }
                    props.setRoute(result.routes)
                })}
            >
                探索！
            </button>
            <Timeline timeline={props.route} />
        </div>
    </>
)

// (5) Container Layer
export const Container: React.FC<ContainerProps> = props => {
    const [startTime, setStartTime] = useState<string>("09:00")
    const [route, setRoute] = useState<Route[]>([])

    return <Component {...{
        startTime,
        setStartTime,
        route,
        setRoute,
        ...props
    }} />
}