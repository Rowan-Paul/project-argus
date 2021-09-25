import 'tailwindcss/tailwind.css'
import '../styles/global.css'

import { SessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: JSX.Element) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
}

export default MyApp
