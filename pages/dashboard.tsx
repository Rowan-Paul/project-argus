import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from '../components/layout/layout'
import Loading from '../components/loading/loading'

interface IDashboardProps {
  user: string
}

interface ISessionUser {
  name: string
  id: string
  image?: string
  email: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const user: ISessionUser = session?.user as ISessionUser
  const router = useRouter()

  switch (status) {
    case 'authenticated':
      return <Dashboard user={user?.name} />

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
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
