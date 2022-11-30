import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../dist/style.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
