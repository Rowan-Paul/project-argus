import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { titleCase } from '../../../../lib/utils'
import { MinimalLayout } from '../../../../components/layout/layout'
import Backdrop from '../../../../components/backdrop'
import Loading from '../../../../components/loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function Season() {
  const [season, setSeason] = useState({})
  const [initialLoadError, setError] = useState(false)
  const [tmdb, setTmdb] = useState({})
  const [posterPath, setPosterPath] = useState(
    'http://via.placeholder.com/1280x720?text=No%20backdrop%20available'
  )
  const [shouldFetch, setShouldFetch] = useState(false)
  const [url, setUrl] = useState('')
  const router = useRouter()
  const { data, error } = useSWR(shouldFetch ? url : null, fetcher)

  useEffect(() => {
    if (!router.isReady) return

    fetch(
      `/api/shows/${router.query.show.toString()}/seasons/${
        router.query.season
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        res.name = titleCase(res.name)
        res.show_name = titleCase(res.show_name)
        setSeason(res)

        if (res.tmdb_id) {
          setUrl(
            `https://api.themoviedb.org/3/tv/${res.show_tmdb_id}/season/${res.season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
          )
          setShouldFetch(true)
        }
      })
      .catch((err) => {
        setError(true)
      })
  }, [router.isReady])

  if (initialLoadError) {
    return (
      <>
        <Head>
          <title>
            {season.name ? `${season.name} | ` : ''}Shows | project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>Failed to load</div>
      </>
    )
  }
  if (!data && !season.tmdb_id)
    return (
      <>
        <Head>
          <title>
            {season.name ? `${season.name} ${season.name} | ` : ''}Shows |
            project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Loading small={false} />
      </>
    )

  if (data?.poster_path && !tmdb?.poster_path) {
    setTmdb(data)
    setPosterPath('https://www.themoviedb.org/t/p/w1280' + data.poster_path)
  }

  return (
    <>
      <Head>
        <title>
          {season.name ? `${season.name} | ${season.show_name} | ` : ''}Shows |
          project argus
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="ml-10 md:ml-0 mb-5">
        <Link
          href={`/shows/${season.show_name
            .replace(/\s+/g, '-')
            .toLowerCase()}-${season.show_year}`}
        >
          <a>
            <h1 className="inline-block mr-3">{season.show_name}</h1>
          </a>
        </Link>
        <span>{season.year}</span>
      </div>

      <div className="grid md:grid-cols-6">
        <Backdrop
          path={posterPath}
          id={season.id}
          type="shows"
          showHistory={false}
          poster={true}
        />

        <div className="p-5 md:p-10 md:col-span-4 lg:col-span-5">
          <h2>{season.name}</h2>
          <p>{season.overview}</p>
        </div>
      </div>

      <div className="mx-5 md:mx-0 md:my-5">
        <span className="font-bold mr-4">Premiered</span>
        <span className="text-sm">{formatDate(tmdb.air_date)}</span>
      </div>
    </>
  )
}

Season.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleString([], options)
}
