import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'

export default function VerifyRequest() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session && !loading) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>E-mail send | Authentication | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1>E-mail sent</h1>
        <p>Check your E-mail for a link to sign in</p>
      </main>
    </>
  )
}

VerifyRequest.getLayout = (page) => <Layout>{page}</Layout>
