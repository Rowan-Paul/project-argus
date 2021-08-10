import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/client'
import { OnClickButton } from '../components/buttons'

export default function SignIn({ providers }) {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session) {
    router.push(
      router.query.callbackUrl ? router.query.callbackUrl.toString() : '/'
    )
  }

  if (!loading && !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Sign In | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1>Sign in</h1>

          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <OnClickButton
                text={`Sign in with ${provider.name}`}
                onClick={() => signIn(provider.id)}
              />
            </div>
          ))}
        </main>
      </div>
    )
  }

  return ''
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
