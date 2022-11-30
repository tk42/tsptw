// (1) import Layer
import React from 'react'

// (2) Types Layer
export type ContainerProps = {
    logged_in: boolean
}
type Props = {
} & ContainerProps

// (3) Consts
const navigation = [
    { name: 'Docs', href: '#' },
    { name: 'Privacy Policy', href: '#' },
]


// (4) DOM Layer
const Component: React.FC<Props> = props => (
    <>
        <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <a href="/">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt="Your Company"
                                className="h-8 w-auto sm:h-10"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            />
                        </a>
                    </div>
                </div>
                <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                            {item.name}
                        </a>
                    ))}
                    <a href={props.logged_in ? "/api/auth/logout" : "/api/auth/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Log {props.logged_in ? "out" : "in"}
                    </a>
                </div>
            </nav>
        </div>
    </>
)

// (6) Container Layer
export const Container: React.FC<ContainerProps> = props => {
    return <Component {...props} />
}