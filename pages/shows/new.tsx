import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/layout'
import { removeLastWord } from '../../lib/utils'
import SearchResults from '../../components/searchResults'
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
        <SearchResults
          url={`https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&query=${show.name}&include_adult=false&first_air_date_year=${show.year}`}
        />
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
