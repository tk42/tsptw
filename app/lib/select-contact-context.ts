import { createContext } from 'react';
import Contact from '../interfaces/contact';

export type State = {
    startId: number
    wayPointIds: Set<number>
    contacts: Contact[]
}

export type Action = {
    type: 'SET_START'
    startId: number
} | {
    type: 'SET_WAYPOINT'
    wayPointId: number
} | {
    type: 'ADD_CONTACT'
    contact: Contact
} | {
    type: 'UPDATE_CONTACT'
    contact: Contact
} | {
    type: 'REMOVE_CONTACT'
    contactId: number
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_START':
            return {
                ...state,
                startId: action.startId
            }
        case 'SET_WAYPOINT':
            return {
                ...state,
                wayPointIds: state.wayPointIds.delete(action.wayPointId) ? state.wayPointIds : state.wayPointIds.add(action.wayPointId)
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.contact.id ? action.contact : contact)
            }
        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.contactId)
            }
        default:
            return state
    }
}

export const ctx = createContext<{
    startId: number
    wayPointIds: Set<number>
    contacts: Contact[]
    dispatch: React.Dispatch<Action>
}>(null)
