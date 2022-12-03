import '../dist/style.css'
import { ReactNode } from 'react'
import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { MDXProvider } from '@mdx-js/react'

const components = {
  h1: (props: { children?: ReactNode }) => <h1 className="mx-4 py-4 text-2xl font-bold tracking-tight text-gray-900">{props.children}</h1>,
  h2: (props: { children?: ReactNode }) => <h2 className="mx-8 pt-4 text-xl font-bold tracking-tight text-gray-900">{props.children}</h2>,
  p: (props: { children?: ReactNode }) => <p className="mx-8 text-gray-500">{props.children}</p>,
  li: (props: { children?: ReactNode }) => <li className="mx-12 text-gray-500 py-1 list-item list-outside drop-shadow-lg">👉 {props.children}</li>,
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </UserProvider>
  )
}
