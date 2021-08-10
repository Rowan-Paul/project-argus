import Head from 'next/head'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { removeLastWord } from '../../lib/utils'
import { SearchResults } from '../../components/movies'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function NewMovie() {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [tmdbData, setTmdbData] = useState({})
  const [movie, setMovie] = useState({})
  const [url, setUrl] = useState(``)
  const router = useRouter()
  const { data, error } = useSWR(shouldFetch ? url : null, fetcher)

  useEffect(() => {
    if (!router.isReady) return

    setMovie({
      title: removeLastWord(router.query.movie, '-'),
      year: router.query.movie.split('-').pop(),
    })
  }, [router.isReady])

  return (
    <>
      <Head>
        <title>Movie not found | Movies | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Looks like we don't have this movie...</h1>
      <p>You can try adding by selecting the correct movie below.</p>
      <SearchResults year={movie.year} title={movie.title} />
    </>
  )
}

NewMovie.getLayout = (page) => <Layout>{page}</Layout>
