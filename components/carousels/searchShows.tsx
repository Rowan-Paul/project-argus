import useSWR from 'swr'
import { useState } from 'react'
import Image from 'next/image'
import { OnClickButton } from '../buttons'
import router from 'next/router'
import Loading from '../loading'
import Show from './Show'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function SearchResults({ name, year }) {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&query=${name}&include_adult=false&first_air_date_year=${year}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <>
        <h2 className="my-5">Results</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="my-5 text-left">
      <h2>Results</h2>
      <div>
        {Object.values(data.results)
          .slice(0, 6)
          .map((show: any) => (
            <HorizontalShow key={show.name} show={show} />
          ))}
      </div>
    </div>
  )
}

export function HorizontalShow({ show }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = () => {
    setLoading(true)
    fetch(
      `/api/shows/${show.name
        .replace(/[^a-zA-Z0-9 !]+/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()}-${show.first_air_date.split('-')[0]}`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overview: show.overview,
          tmdb: show.id,
        }),
      }
    )
      .then((res) => {
        if (res.status === 201) {
          router.push(
            `/shows/${show.name
              .replace(/[^a-zA-Z0-9 !]+/g, '')
              .replace(/\s+/g, '-')
              .toLowerCase()}-${show.first_air_date.split('-')[0]}`
          )
          setLoading(false)
        } else {
          setError(true)
        }
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
      })
  }

  return (
    <div className="grid md:grid-cols-6 p-6 gap-4 mt-2 bg-accent rounded-2xl">
      <div className="col-span-6 md:col-span-1">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${show.poster_path}`} //185x278
          alt={`${show.title} show poster`}
          width={165}
          height={247}
        />
      </div>
      <div className="col-span-5">
        <h3>{show.name}</h3>
        <p>Premiered: {formatDate(show.first_air_date)}</p>
        <p>{show.overview}</p>
        {loading ? (
          <Loading small={true} />
        ) : error ? (
          <p className="ml-5 text-red-700 font-bold">
            Something went wrong, reload the page to try again
          </p>
        ) : (
          <OnClickButton text="Add show" onClick={() => handleClick()} />
        )}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleString([], options)
}
