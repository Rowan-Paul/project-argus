import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { titleCase } from '../../lib/utils'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Movie() {
  const [movieQuery, setMovieQuery] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const router = useRouter()
  const { data, error } = useSWR(
    shouldFetch ? `/api/movies/${movieQuery}` : null,
    fetcher
  )

  useEffect(() => {
    if (!router.isReady) return

    setShouldFetch(true)
    setMovieQuery(router.query.movie.toString())
  }, [router.isReady])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  data.title = titleCase(data.title)

  return (
    <div className="p-10">
      <Head>
        <title>
          {data.title} {data.year} | Movies | project argus
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="inline-block mr-3">{data.title}</h1>
        <span>{data.year}</span>
      </div>
      <p>{data.overview}</p>
    </div>
  )
}
