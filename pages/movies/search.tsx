import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import ItemHorizontal from '../../components/item-horizontal/item-horizontal'
import { titleCase } from '../../lib/utils'

interface IMovie {
  title: string
  year: number
  overview: string
  id: number
}

const SearchMoviePage = () => {
  const [loading, setLoading] = useState<boolean>()
  const [formError, setFormError] = useState<string>()
  const [results, setResults] = useState<IMovie[]>()

  const submitForm = async (event) => {
    event.preventDefault()
    if (!(document.getElementById('searchForm') as HTMLInputElement).checkValidity()) {
      setFormError('Search field cannot be empty')
    } else {
      setFormError(undefined)
      setLoading(true)

      fetch(`/api/movies/search?movie=${event.target?.title?.value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length < 1) {
            throw new Error('res.length is 0')
          }

          setResults(res)
          setLoading(false)
        })
        .catch((error) => setFormError('No movie found'))
    }
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
      {formError ? <p className="text-red-500">{formError}</p> : ''}

      {loading && <Loading />}
      {results?.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6 mt-2">
          {Object.values(results).map((item: IMovie) => (
            <Link href={`/movies/${item.title}-${item.year}`} key={item.id}>
              <a className="no-underline">
                <ItemHorizontal
                  name={item.title}
                  title={titleCase(item.title)}
                  subtitle={``}
                  description={item.overview}
                  image={''}
                  type={'movie'}
                />
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

SearchMoviePage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default SearchMoviePage
