import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import SearchResults from '../../components/search-results/search-results'

interface IShow {
  name: string
  year: number
}

interface IResults {
  results: IShow[]
  total_results: number
}

const NewShowPage = (): JSX.Element => {
  const [show, setShow] = useState<IShow>()
  const [loading, setLoading] = useState<boolean>()
  const [formError, setFormError] = useState<string>()
  const [results, setResults] = useState<IResults>()
  const [page, setPage] = useState<number>(1)
  const [showExists, setShowExists] = useState<boolean>()
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (!router.isReady) return

    if (router.query?.show) {
      setShow({
        name: router.query.show as string,
        year: parseInt(router.query.year as string),
      })

      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&page=1&query=${router.query.show}&include_adult=false${
          router.query.year && `&first_air_date_year=${parseInt(router.query.year as string)}`
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.length < 1) {
            throw new Error('No show returned')
          }
          setResults(res)
          setLoading(false)
        })
        .catch(() => setFormError('No show found'))

      fetch(`/api/shows/${router.query.show}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.length > 0) {
            setShowExists(true)
          }
        })
    }
  }, [router.isReady, router.query.show, router.query.year])

  switch (status) {
    case 'loading':
      return <Loading />

    case 'unauthenticated':
      signIn()
      return <Loading />
  }
  if (showExists) {
    router.push(`/shows/${router.query.show}`)
    return <Loading />
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (!(document.getElementById('searchForm') as HTMLInputElement).checkValidity()) {
      setFormError('Search field cannot be empty and year has to be in between 1900 and 2099')
    } else {
      setFormError(undefined)
      setLoading(true)
      setShow({
        name: event.target.name.value,
        year: event.target.year?.value,
      })

      router.push(
        `/shows/new?show=${event.target.name.value}${event.target.year.value && `&year=${event.target.year.value}`}`
      )
    }
  }

  const nextPage = async () => {
    setFormError(undefined)
    setLoading(true)

    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${
        page + 1
      }&query=${router.query.show}&include_adult=false${
        router.query.year && `&first_air_date_year=${parseInt(router.query.year as string)}`
      }`
    )
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

    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${
        page - 1
      }&query=${router.query.show}&include_adult=false${
        router.query.year && `&first_air_date_year=${parseInt(router.query.year as string)}`
      }`
    )
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
        <title>Add a new show | Shows | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Add a new show</h1>

      <form
        onSubmit={submitForm}
        id="searchForm"
        noValidate
        className="grid grid-cols-7 my-10 relative mx-auto text-gray-600"
      >
        <input
          className="col-span-4 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mr-2"
          type="search"
          name="name"
          defaultValue={show?.name && show?.name}
          placeholder="Show name"
          required
        />
        <input
          className="col-span-2 border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
          type="number"
          name="year"
          min="1900"
          max="2099"
          step="1"
          defaultValue={show?.year && show?.year}
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
      {results?.total_results && <span>Total results: {results?.total_results}</span>}

      {formError ? (
        <p className="text-red-500">{formError}</p>
      ) : loading ? (
        <Loading />
      ) : (
        results?.results?.length > 0 && <SearchResults results={results.results} button />
      )}

      {page > 1 && (
        <span className="inline-block p-5 cursor-pointer" onClick={prevPage}>
          Previous page
        </span>
      )}
      {results?.total_results / 20 > page && (
        <span className="inline-block p-5 cursor-pointer" onClick={nextPage}>
          Next page
        </span>
      )}
    </>
  )
}

NewShowPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default NewShowPage
