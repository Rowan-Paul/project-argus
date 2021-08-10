import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { titleCase } from '../../lib/utils'
import { MovieLayout } from '../../components/layout'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Movie() {
  const [movie, setMovie] = useState({})
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

    fetch(`/api/movies/${router.query.movie.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        res.title = titleCase(res.title)
        setMovie(res)

        if (res.tmdb_id) {
          setUrl(
            `https://api.themoviedb.org/3/movie/${res.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
          )
          setShouldFetch(true)
        }
      })
      .catch((err) => setError(true))
  }, [router.isReady])

  if (initialLoadError) {
    router.push(`/movies/new?movie=${router.query.movie}`)
    return <div>Failed to load</div>
  }
  if (!data) return <div>Loading...</div>

  if (data.backdrop_path && !tmdb.backdrop_path) {
    setTmdb(data)
    setBackdropPath('https://www.themoviedb.org/t/p/w1280' + data.backdrop_path)
  }
  console.log(tmdb)

  return (
    <>
      <Head>
        <title>
          {movie.title} {movie.year} | Movies | project argus
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="ml-10 md:ml-0 mb-5">
        <h1 className="inline-block mr-3">{movie.title}</h1>
        <span>{movie.year}</span>
      </div>

      <div className="grid md:grid-cols-3">
        <div
          style={{
            background: `url(${backdropPath}) no-repeat center center`,
            backgroundSize: 'cover',
            minHeight: '300px',
          }}
          className="min-h-439 md:col-span-2"
        >
          &nbsp;
        </div>

        <div className="p-10">
          <p className="italic">{tmdb.tagline}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  )
}

Movie.getLayout = (page) => <MovieLayout>{page}</MovieLayout>
