import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/client'
import { MinimalLayout } from '../components/layout/layout'
import Discover from '../components/discover'
import { useRouter } from 'next/router'
import MaterialIcon from '../lib/materialIcons'
import Loading from '../components/loading'
import DiscoverShows from '../components/carousels/discoverShows'

export default function Dashboard() {
  const [session, setSession] = useState()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)

        // check if object is empty
        if (
          res &&
          Object.keys(res).length === 0 &&
          res.constructor === Object
        ) {
          if (!res.user?.name && !loading) {
            router.push('/auth/account-details')
          }

          signIn()
        } else {
          setSession(res)
        }
      })
      .catch((error) => {
        signIn()
      })
  }, [])

  if (!loading && session) {
    if (!session?.user?.name) {
      router.push('/auth/account-details')
      return (
        <>
          <Head>
            <title>Dashboard | project argus</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Loading small={false} />
        </>
      )
    }

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

        <Discover
          url={`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`}
          type="Movies"
        />
        <Discover
          url={`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`}
          type="TV Shows"
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Loading small={false} />
    </>
  )
}

Dashboard.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>
