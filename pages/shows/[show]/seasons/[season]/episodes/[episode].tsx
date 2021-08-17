import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { titleCase } from '../../../../../../lib/utils'
import { MinimalLayout } from '../../../../../../components/layout/layout'
import Backdrop from '../../../../../../components/backdrop'
import Loading from '../../../../../../components/loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function Episode() {
  const [episode, setEpisode] = useState({})
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
      }/episodes/${router.query.episode}`
    )
      .then((res) => res.json())
      .then((res) => {
        res.name = titleCase(res.name)
        res.show_name = titleCase(res.show_name)
        setEpisode(res)

        if (res.tmdb_id) {
          setUrl(
            `https://api.themoviedb.org/3/tv/${res.show_tmdb_id}/season/${router.query.episode}/episode/${res.episode_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
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
            {episode.name ? `${episode.name} | ` : ''}Shows | project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>Failed to load</div>
      </>
    )
  }
  if (!data && !episode.tmdb_id)
    return (
      <>
        <Head>
          <title>
            {episode.name ? `${episode.name} ${episode.name} | ` : ''}Shows |
            project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Loading small={false} />
      </>
    )

  if (data?.still_path && !tmdb?.still_path) {
    setTmdb(data)
    setPosterPath('https://www.themoviedb.org/t/p/w1280' + data.still_path)
  }

  return (
    <>
      <Head>
        <title>
          {episode.name ? `${episode.name} | ${episode.show_name} | ` : ''}Shows
          | project argus
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="ml-10 md:ml-0 mb-5">
        <Link href={`/shows/${router.query.show}`}>
          <a>
            <h1 className="inline-block mr-3">{episode.show_name} </h1>
          </a>
        </Link>
        <Link
          href={`/shows/${router.query.show}/seasons/${router.query.season}`}
        >
          <a>
            <span className="text-sm">Season {router.query.season}</span>
          </a>
        </Link>
      </div>

      <div className="grid md:grid-cols-10">
        <Backdrop
          path={posterPath}
          id={episode.id}
          type="shows"
          showHistory={true}
        />

        <div className="p-5 md:p-10 md:col-span-4 lg:col-span-3">
          <h2>{`${router.query.season}x${router.query.episode} ${episode.name}`}</h2>
          <p>{episode.overview}</p>
        </div>
      </div>

      <div className="mx-5 md:mx-0 md:my-5">
        <span className="font-bold mr-4">Premiered</span>
        <span className="text-sm">{formatDate(tmdb.air_date)}</span>
      </div>
    </>
  )
}

Episode.getLayout = (page) => <MinimalLayout>{page}</MinimalLayout>

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleString([], options)
}
