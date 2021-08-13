import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getSession, signIn, useSession } from 'next-auth/client'
import { MinimalLayout } from '../components/layout'
import DiscoverMovies from '../components/carousels/discoverMovies'
import { useRouter } from 'next/router'
import MaterialIcon from '../lib/materialIcons'

export default function Dashboard() {
  const [session, setSession] = useState({})
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setSession(res)

        if (!res.user?.name) {
          router.push('/auth/email')
        }
      })
      .catch((error) => {
        console.log(error)
        signIn()
      })
  }, [])

  if (!loading && session) {
    return (
      <>
        <Head>
          <title>Dashboard | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex align-middle">
          {session.user?.image ? (
            <Image
              src={session.user?.image}
              alt="Profile picture"
              width={32}
              height={32}
            />
          ) : (
            <MaterialIcon request="Person" />
          )}
          <h1>Welcome, {session.user?.name}</h1>
        </div>

        <DiscoverMovies />
      </>
    )
  }

  return <p>Loading...</p>
}

Dashboard.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>
