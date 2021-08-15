import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MinimalLayout } from '../../components/layout/layout'
import MaterialIcon from '../../lib/materialIcons'
import Loading from '../../components/loading'
import HistoryMovies from '../../components/carousels/historyMovies'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function User() {
  const [url, setUrl] = useState()
  const [shouldFetch, setShouldFetch] = useState(false)
  const { data, error } = useSWR(shouldFetch ? url : null, fetcher)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    if (!router.query.user !== '[user]') {
      setUrl(`/api/users/${router.query.user}`)
      setShouldFetch(true)
    }
  }, [router.isReady])
  useEffect(() => {
    if (url) {
    }
  }, [url])

  if (error) {
    return (
      <>
        <Head>
          <title>Users | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p>Something went wrong...</p>
      </>
    )
  }
  if (!data) {
    return (
      <>
        <Head>
          <title>Users | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Loading small={false} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{data?.name}'s profile | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-10 md:px-20 text-center min-h-s50">
        {data?.image ? (
          <Image
            src={data?.image}
            alt="Profile picture"
            width={96}
            height={96}
          />
        ) : (
          <MaterialIcon request="PersonLarge" />
        )}

        <h1>{data?.name}</h1>
        <HistoryMovies user={data.id} />
      </div>
    </>
  )
}

User.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>
