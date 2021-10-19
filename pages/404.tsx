import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'

import CenterLayout from '../components/center-layout/center-layout'

const Custom404 = (): JSX.Element => {
  const router = useRouter()
  const { status } = useSession()

  if (router.query?.movie && router.query.movie !== 'new' && status === 'authenticated') {
    return (
      <>
        <Head>
          <title>project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Movie not found</h1>
        <p>
          Perhaps you got the year wrong or it doesn&apos;t exist yet? <br></br>
          <Link href={`/movies/new?movie=${router.query.movie}`}>
            <a>You can always add a new movie here.</a>
          </Link>
        </p>
      </>
    )
  } else if (router.query?.show && router.query.show !== 'new'  && status === 'authenticated') {
    return (
      <>
        <Head>
          <title>project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Show not found</h1>
        <p>
          Perhaps you got the year wrong or it doesn&apos;t exist yet? <br></br>
          <Link href={`/shows/new?show=${router.query.show}`}>
            <a>You can always add a new show here.</a>
          </Link>
        </p>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Not found</h1>
      <p>Are you lost?</p>
    </>
  )
}

export default Custom404

Custom404.getLayout = function getLayout(page: JSX.Element) {
  return <CenterLayout>{page}</CenterLayout>
}
