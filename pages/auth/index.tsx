import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProviders, signIn, useSession } from 'next-auth/client'
import { OnClickButton } from '../../components/buttons'
import Layout from '../../components/layout/layout'
import { useState } from 'react'
import Loading from '../../components/loading'
import MaterialIcon from '../../lib/materialIcons'

export default function Auth({ providers }) {
  const [session, loading] = useSession()
  const [formError, setFormError] = useState(String)
  const [formLoading, setFormLoading] = useState(false)
  const router = useRouter()

  const registerUser = (event) => {
    event.preventDefault()

    if (!document.getElementById('emailForm').checkValidity()) {
      setFormError(`Please fill in your email`)
    } else {
      setFormError(undefined)
      setFormLoading(true)

      const email = event.target.email.value
      signIn('email', { email })
    }
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

        <p>Something went wrong...</p>
      </>
    )
  }

  if (!loading && !session) {
    return (
      <>
        <Head>
          <title>Authentication | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10">
          <h1>Sign in</h1>
          {Object.values(providers).map((provider) => {
            if (provider.id === 'email') {
              return (
                <form
                  onSubmit={registerUser}
                  key="emailForm"
                  className="text-left"
                  id="emailForm"
                  noValidate
                >
                  <p className="text-sm text-center pb-2">Or use E-mail</p>
                  <div className="relative border-b-2 min-w-96 focus-within:border-blue-500">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      required
                      className="block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="absolute top-0 duration-300 origin-0"
                    >
                      E-mail
                    </label>
                  </div>
                  {formError ? (
                    <p className="text-red-700 text-center w-60 overflow-ellipsis overflow-hidden">
                      {formError}
                    </p>
                  ) : (
                    <p className="text-red-700 text-center w-60 overflow-ellipsis overflow-hidden"></p>
                  )}
                  {formLoading ? (
                    <span className="p-3 text-white bg-green-400 mt-10 inline-block">
                      <MaterialIcon request="Pending" /> Loading...
                    </span>
                  ) : (
                    <button
                      type="submit"
                      className="mt-3 p-3 text-white bg-green-400"
                    >
                      Sign In
                    </button>
                  )}
                </form>
              )
            } else {
              return (
                <span key={provider.name}>
                  <OnClickButton
                    text={`${provider.name}`}
                    onClick={() => signIn(provider.id)}
                  />
                </span>
              )
            }
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Authentication | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Loading small={false} />
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

Auth.getLayout = (page) => <Layout>{page}</Layout>
