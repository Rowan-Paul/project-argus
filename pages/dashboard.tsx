import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { MinimalLayout } from '../components/layout'
import DiscoverMovies from '../components/discoverMovies'

export default function Dashboard() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/auth?callbackUrl=/dashboard')
    }
  }, [session, loading])

  if (!loading && session) {
    return (
      <>
        <Head>
          <title>Dashboard | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex align-middle">
          <Image
            src={session.user.image}
            alt="Profile picture"
            width={32}
            height={32}
          />
          <h1>Welcome, {session.user.name}</h1>
        </div>

        <DiscoverMovies />
      </>
    )
  }

  return ''
}

Dashboard.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>
