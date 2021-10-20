import { useEffect, useState } from 'react'
import Head from 'next/head'

import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import { useRouter } from 'next/router'
import SearchResults from '../../components/search-results/search-results'

interface IMovie {
  title: string
  year: number
  overview?: string
  id?: number
}

interface IResults {
  moviesCount: number
  movies: IMovie[]
}

const SearchMoviePage = () => {
  const [loading, setLoading] = useState<boolean>()
  const [formError, setFormError] = useState<string>()
  const [results, setResults] = useState<IResults>()
  const [movie, setMovie] = useState<IMovie>()
  const [page, setPage] = useState<number>(0)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    if (router.query?.movie) {
      setMovie({
        title: router.query.movie as string,
        year: parseInt(router.query.year as string),
      })

      fetch(`/api/movies/search?movie=${router.query.movie}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length < 1) {
            throw new Error('No results')
          }

          setResults(res)
          setLoading(false)
        })
        .catch(() => setFormError('No movie found for this query'))
    }
  }, [router.isReady, router.query.movie, router.query.year])

  const submitForm = async (event) => {
    event.preventDefault()
    if (!(document.getElementById('searchForm') as HTMLInputElement).checkValidity()) {
      setFormError('Search field cannot be empty')
    } else {
      setFormError(undefined)
      setLoading(true)
      setMovie({
        title: event.target.title.value,
        year: event.target.year?.value,
      })

      router.push(`/movies/search?movie=${event.target.title.value}`)
    }
  }

  const nextPage = async () => {
    setFormError(undefined)
    setLoading(true)

    fetch(`/api/movies/search?movie=${router.query.movie}&page=${page + 1}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length < 1) {
          throw new Error('No results')
        }

        setPage(page + 1)
        setResults(res)
        setLoading(false)
      })
      .catch(() => setFormError('Something went wrong...'))
  }

  const prevPage = async () => {
    setFormError(undefined)
    setLoading(true)

    fetch(`/api/movies/search?movie=${router.query.movie}&page=${page - 1}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length < 1) {
          throw new Error('No results')
        }

        setPage(page - 1)
        setResults(res)
        setLoading(false)
      })
      .catch(() => setFormError('Something went wrong...'))
  }

  return (
    <>
      <Head>
        <title>Search | Movies | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Search</h1>

      <form onSubmit={submitForm} id="searchForm" noValidate className="w-full flex my-10 relative text-gray-600">
        <input
          className="w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mr-2"
          type="search"
          name="title"
          placeholder="Movie title"
          defaultValue={movie?.title}
          required
        />
        <button type="submit" className="ml-auto bg-accent py-3 px-10 h-full rounded-lg">
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
      {results?.moviesCount && <span>Total results: {results?.moviesCount}</span>}

      {formError ? (
        <p className="text-red-500">{formError}</p>
      ) : loading ? (
        <Loading />
      ) : (
        results?.movies.length > 0 && <SearchResults results={results.movies} />
      )}

      {page > 0 && (
        <span className="inline-block p-5 cursor-pointer" onClick={prevPage}>
          Previous page
        </span>
      )}
      {results?.moviesCount / 20 > page + 1 && (
        <span className="inline-block p-5 cursor-pointer" onClick={nextPage}>
          Next page
        </span>
      )}
    </>
  )
}

SearchMoviePage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default SearchMoviePage
