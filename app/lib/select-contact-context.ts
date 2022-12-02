import { createContext } from 'react';

export type State = {
    startId: string
    wayPointIds: Set<string>
}

export type Action = {
    type: 'SET_START'
    startId: string
} | {
    type: 'SET_WAYPOINT'
    wayPointId: string
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
        default:
            return state
    }
}

export const ctx = createContext<{
    startId: string
    wayPointIds: Set<string>
    dispatch: React.Dispatch<Action>
}>(null)
