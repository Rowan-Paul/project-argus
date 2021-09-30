import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import CenterLayout from '../components/center-layout/center-layout'
import Loading from '../components/loading/loading'

const Home = (): JSX.Element => {
  const { status } = useSession()
  const router = useRouter()

  switch (status) {
    case 'authenticated':
      router.push('/dashboard')
      return <Loading />

    case 'loading':
      return <Loading />

    case 'unauthenticated':
      return <Landingpage />
  }
}

const Landingpage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl font-bold">project argus</h1>

      <p className="mt-3 text-2xl">Track everything</p>
    </>
  )
}

Home.getLayout = function getLayout(page: JSX.Element) {
  return <CenterLayout>{page}</CenterLayout>
}

export default Home
