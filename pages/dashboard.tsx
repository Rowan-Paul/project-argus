import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from '../components/layout/layout'
import Loading from '../components/loading/loading'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Item from '../components/item/item'

interface IDashboardProps {
  user: string
  history: {
    title?: string
    year?: number
    name?: string
    datetime: string
    show?: {
      name: string
      year: number
    }
    season?: {
      season_number: number
    }
    episode_number: string
  }[]
}

interface ISessionUser {
  name: string
  id: string
  image?: string
  email: string
}

const DashboardPage = (props: IDashboardProps): JSX.Element => {
  const { data: session, status } = useSession()
  const user: ISessionUser = session?.user as ISessionUser
  const router = useRouter()

  switch (status) {
    case 'authenticated':
      return <Dashboard user={user?.name} history={props.history} />

    case 'loading':
      return <Loading />

    case 'unauthenticated':
      router.push('/')
      return <Loading />
  }
}

const Dashboard = (props: IDashboardProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Dashboard</h1>
      <p>Welcome {props.user}</p>

      <div className="my-10">
        <h2>Up next</h2>
        <p>Coming soon...</p>
      </div>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default DashboardPage
