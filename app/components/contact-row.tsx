// (1) import Layer
import React, { useState } from 'react'
import Contact from '../interfaces/contact'
import EditContact from './edit-contact'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Action, State } from '../lib/select-contact-context';


// (2) Types Layer
export type ContainerProps = {
    accountId: string
    contacts: Contact[]
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
    person: Contact
    personIdx: number
    state: State
    dispatch: React.Dispatch<Action>
}
type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
} & ContainerProps

// (4) DOM Layer
const Component: React.FC<Props> = props => (
    <>
        <EditContact {...{
            accountId: props.accountId,
            person: props.person,
            contacts: props.contacts,
            setContacts: props.setContacts,
            open: props.open,
            setOpen: props.setOpen,
        }} />
        <tr key={props.person.id} className={props.personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
            <td className="relative whitespace-nowrap py-1 pl-1 text-right text-md font-medium">
                <input
                    type={"radio"}
                    id={`s-${props.person.id}`}
                    name={"startPoint"}
                    defaultChecked={props.state.startId === `${props.person.id}`}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={() => {
                        props.dispatch({ type: 'SET_START', startId: `${props.person.id}` })
                        // NOTE: Not support because the appearance is not matched to the internal state.
                        // if (props.wayPointIdxs.includes(props.startPointIdx)) {
                        //     props.setWayPointIdxs(props.wayPointIdxs.filter((idx) => idx !== props.startPointIdx))
                        // }
                    }}
                />
            </td>
            <td className="relative whitespace-nowrap py-1 pl-1 text-right text-md font-medium">
                <input
                    type={"checkbox"}
                    id={`w-${props.person.id}`}
                    name={"wayPoint"}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    disabled={props.state.startId === `${props.person.id}`}
                    checked={props.state.wayPointIds.has(`${props.person.id}`)}
                    onChange={() => {
                        props.dispatch({ type: 'SET_WAYPOINT', wayPointId: `${props.person.id}` })

                        // NOTE: Not support because the appearance is not matched to the internal state.
                        // if (props.wayPointIdxs.includes(props.startPointIdx)) {
                        //     props.setWayPointIdxs(props.wayPointIdxs.filter((idx) => idx !== props.startPointIdx))
                        // }
                    }}
                />
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-6">
                {props.person.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-md text-gray-500">{props.person.address}</td>
            <td className="whitespace-nowrap px-1 py-4 text-md text-gray-500">{props.person.stayingMin}</td>
            <td className="whitespace-nowrap px-1 py-4 text-md text-gray-500">{props.person.startTime}</td>
            <td className="whitespace-nowrap px-1 py-4 text-md text-gray-500">{props.person.endTime}</td>
            <td className="relative whitespace-nowrap py-1 text-right text-md font-medium">
                <a
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => props.setOpen(true)}>
                    <PencilSquareIcon />
                </a>
            </td>
            <td className="relative whitespace-nowrap py-1 text-right text-md font-medium">
                <a
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                        if (!confirm(`${props.person.name}を削除しますか？`)) {
                            return
                        }
                        fetch('/api/contact/delete', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "accountId": props.accountId,
                                "contactId": props.person.id
                            })
                        }).then(async () => {
                            props.setContacts(props.contacts.filter((p) => p.id !== props.person.id))
                            alert(`削除しました`)
                        })
                    }}
                >
                    <TrashIcon />
                </a>
            </td>
        </tr>
    </>
)


// (6) Container Layer
export const Container: React.FC<ContainerProps> = props => {
    const editStateOpen = useState(false)
    return <Component {...{
        open: editStateOpen[0],
        setOpen: editStateOpen[1],
        ...props
    }} />
}