// (1) import Layer
import React from 'react'
import { useUser, UserProfile } from '@auth0/nextjs-auth0'

// (2) Types Layer
export type ContainerProps = {
}
type Props = {
    user?: UserProfile
} & ContainerProps

// (3) Define Global Constants
const classname = "font-medium text-indigo-600 hover:text-indigo-500"

// (4) DOM Layer
const Component: React.FC<Props> = props => (
    <>
        <a href={props.user === undefined ? "/api/auth/logout" : "/api/auth/login"} className={classname}>
            Log {props.user === undefined ? "out" : "in"}
        </a>
    </>
)

// (5) Container Layer
export const Container: React.FC<ContainerProps> = props => {
    const { user, error, isLoading } = useUser();
    if (isLoading) {
        return <></>
    }
    return <Component {...{
        user,
        ...props
    }} />
}