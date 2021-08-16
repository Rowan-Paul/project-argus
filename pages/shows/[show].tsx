import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { titleCase } from '../../lib/utils'
import { MinimalLayout } from '../../components/layout/layout'
import ShowDetails from '../../components/showDetails'
import Backdrop from '../../components/backdrop'
import Loading from '../../components/loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function Show() {
  const [show, setShow] = useState({})
  const [initialLoadError, setError] = useState(false)
  const [tmdb, setTmdb] = useState({})
  const [backdropPath, setBackdropPath] = useState(
    'http://via.placeholder.com/1280x720?text=No%20backdrop%20available'
  )
  const [shouldFetch, setShouldFetch] = useState(false)
  const [url, setUrl] = useState('')
  const router = useRouter()
  const { data, error } = useSWR(shouldFetch ? url : null, fetcher)

  useEffect(() => {
    if (!router.isReady) return

    fetch(`/api/shows/${router.query.show.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        res.title = titleCase(res.name)
        setShow(res)

        if (res.tmdb_id) {
          setUrl(
            `https://api.themoviedb.org/3/tv/${res.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
          )
          setShouldFetch(true)
        }
      })
      .catch((err) => {
        setError(true)
      })
  }, [router.isReady])

  if (initialLoadError) {
    router.push(`/shows/new?show=${router.query.show}`)
    return (
      <>
        <Head>
          <title>
            {show.name ? `${show.name} | ` : ''}Shows | project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>Failed to load</div>
      </>
    )
  }
  if (!data && !show.tmdb_id)
    return (
      <>
        <Head>
          <title>
            {show.name ? `${show.name} ${show.name} | ` : ''}Shows | project
            argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Loading small={false} />
      </>
    )

  if (data?.backdrop_path && !tmdb?.backdrop_path) {
    setTmdb(data)
    setBackdropPath('https://www.themoviedb.org/t/p/w1280' + data.backdrop_path)
  }

  return (
    <>
      <Head>
        <title>{show.name ? `${show.name} | ` : ''}Shows | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="ml-10 md:ml-0 mb-5">
        <h1 className="inline-block mr-3">{show.title}</h1>
        <span>{show.year}</span>
      </div>

      <div className="grid md:grid-cols-3">
        <Backdrop
          path={backdropPath}
          id={show.id}
          type="shows"
          showHistory={false}
        />

        <div className="p-5 md:p-10">
          <p className="italic">{tmdb.tagline}</p>
          <p>{show.overview}</p>
        </div>
      </div>

      <ShowDetails tmdb={tmdb} />
    </>
  )
}

Show.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>
