import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/client'
import { OnClickButton } from '../../components/buttons'
import Layout from '../../components/layout'
import { useState } from 'react'
import MaterialIcon from '../../lib/materialIcons'

export default function Auth({ providers }) {
  const [session, loading] = useSession()
  const [formLoading, setFormLoading] = useState(false)
  const router = useRouter()

  const registerUser = (event) => {
    event.preventDefault()
    setFormLoading(true)

    const email = event.target.email.value
    signIn('email', { email })
  }

  if (session) {
    router.push(
      router.query.callbackUrl ? router.query.callbackUrl.toString() : '/'
    )
  }

  if (router.query.error) {
    return (
      <>
        <Head>
          <title>Sign In | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1>Something went wrong</h1>
          <p>Try again or contact us.</p>
        </main>
      </>
    )
  }

  if (!loading && !session) {
    return (
      <>
        <Head>
          <title>Sign In | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1>Sign in</h1>

          {Object.values(providers).map((provider) => {
            if (provider.id === 'email') {
              return (
                <form
                  onSubmit={registerUser}
                  key="emailForm"
                  className="text-left max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10"
                >
                  <p className="text-sm text-center">Or use E-mail</p>
                  <div className="relative border-b-2 min-w-96 focus-within:border-blue-500">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      required
                      className="block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="absolute top-0 -z-1 duration-300 origin-0"
                    >
                      E-mail
                    </label>
                  </div>
                  {formLoading ? (
                    <span className="p-3 text-white bg-green-400 mt-10 inline-block">
                      <MaterialIcon request="Pending" /> Loading...
                    </span>
                  ) : (
                    <button
                      type="submit"
                      className="p-3 text-white bg-green-400"
                    >
                      Sign In
                    </button>
                  )}
                </form>
              )
            } else {
              return (
                <div key={provider.name}>
                  <OnClickButton
                    text={`${provider.name}`}
                    onClick={() => signIn(provider.id)}
                  />
                </div>
              )
            }
          })}
        </main>
      </>
    )
  }

  return <p>Loading...</p>
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

Auth.getLayout = (page) => <Layout>{page}</Layout>
