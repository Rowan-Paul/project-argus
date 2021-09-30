import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import Layout from '../../components/layout/layout'
import { getLastWord, removeLastWord } from '../../lib/utils'
import Loading from '../../components/loading/loading'
import SearchResults from '../../components/search-results/search-results'
import { useSession } from 'next-auth/react'

interface IMovie {
  title: string
  year: number
}

const NewMoviePage = () => {
  const [movie, setMovie] = useState<IMovie>()
  const [loading, setLoading] = useState<boolean>()
  const [formError, setFormError] = useState<string>()
  const [results, setResults] = useState<IMovie[]>()
  const [movieExists, setMovieExists] = useState<boolean>()
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (!router.isReady) return

    if (router.query?.movie) {
      setMovie({
        title: removeLastWord(router.query.movie, '-'),
        year: parseInt(getLastWord(router.query.movie.toString(), '-')),
      })

      fetch(`/api/movies/${router.query.movie}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.length > 0) {
            setMovieExists(true)
          }
        })
    }
  }, [router.isReady, router.query.movie])

  switch (status) {
    case 'loading':
      return <Loading />

    case 'unauthenticated':
      router.push('/404')
      return <Loading />
  }
  if (movieExists) {
    router.push(`/movies/${router.query.movie}`)
    return <Loading />
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (!(document.getElementById('searchForm') as HTMLInputElement).checkValidity()) {
      setFormError('Search field cannot be empty and year has to be in between 1900 and 2099')
    } else {
      setFormError(undefined)
      setLoading(true)
      setMovie({
        title: event.target.title.value,
        year: event.target.year?.value,
      })

      if (event.target?.year?.value) {
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${event.target.title.value}&page=1&include_adult=false&year=${event.target.year.value}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.length < 1) {
              throw new Error('res.length is 0')
            }
            setResults(res.results)
            setLoading(false)
          })
          .catch((error) => setFormError('No movie found'))
      } else {
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${event.target.title.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.length < 1) {
              throw new Error('res.length is 0')
            }
            setResults(res.results)
            setLoading(false)
          })
          .catch((error) => setFormError('No movie found'))
      }
    }
  }

  return (
    <>
      <Head>
        <title>Add a new movie | Movies | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Add a new movie</h1>

      <form
        onSubmit={submitForm}
        id="searchForm"
        noValidate
        className="grid grid-cols-7 my-10 relative mx-auto text-gray-600"
      >
        <input
          className="col-span-4 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mr-2"
          type="search"
          name="title"
          defaultValue={movie?.title}
          placeholder="Movie title"
          required
        />
        <input
          className="col-span-2 border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
          type="number"
          name="year"
          min="1900"
          max="2099"
          step="1"
          defaultValue={movie?.year}
          placeholder="Year"
        />
        <button type="submit" className="ml-3 bg-accent py-3 px-5 rounded-lg">
          <svg
            className="text-white h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </form>
      {formError ? <p className="text-red-500">{formError}</p> : ''}

      {loading && <Loading />}
      {results?.length > 0 && <SearchResults results={results} />}
    </>
  )
}

NewMoviePage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default NewMoviePage
