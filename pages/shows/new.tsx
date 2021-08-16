import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/layout'
import { removeLastWord } from '../../lib/utils'
import SearchResults from '../../components/carousels/searchShows'
import Loading from '../../components/loading'

export default function NewShow() {
  const [show, setShow] = useState()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    setShow({
      name: removeLastWord(router.query.show, '-'),
      year: router.query.show.toString().split('-').pop(),
    })
  }, [router.isReady])

  if (show) {
    return (
      <>
        <Head>
          <title>Show not found | Shows | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Looks like we don't have this show...</h1>
        <p>You can try adding by selecting the correct show below.</p>
        <SearchResults year={show.year} name={show.name} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Show not found | Shows | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Looks like we don't have this show...</h1>
      <p>You can try adding by selecting the correct show below.</p>
      <Loading small={false} />
    </>
  )
}

NewShow.getLayout = (page) => <Layout>{page}</Layout>
