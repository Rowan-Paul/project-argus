import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { OnClickButton } from '../components/buttons'
import Layout from '../components/layout'

export default function Home() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && !loading) {
      router.push('/dashboard')
    }
  }, [session, loading])

  if (!loading && !session) {
    return (
      <>
        <Head>
          <title>project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="text-6xl font-bold">project argus</h1>

        <p className="mt-3 text-2xl">Track everything</p>

        <span>
          <OnClickButton text="Join project-argus" onClick={() => signIn()} />
        </span>
      </>
    )
  }

  return ''
}

Home.getLayout = (page) => <Layout>{page}</Layout>
