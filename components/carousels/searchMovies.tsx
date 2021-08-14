import useSWR from 'swr'
import { useState } from 'react'
import Image from 'next/image'
import { OnClickButton } from '../buttons'
import router from 'next/router'
import Loading from '../loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function SearchResults({ title, year }) {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`,
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
      <div className="">
        {Object.values(data.results)
          .slice(0, 6)
          .map((movie: any) => (
            <HorizontalMovie key={movie.title} movie={movie} />
          ))}
      </div>
    </div>
  )
}

export function HorizontalMovie({ movie }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = () => {
    setLoading(true)
    fetch(
      `/api/movies/${movie.title.replace(/\s+/g, '-').toLowerCase()}-${
        movie.release_date.split('-')[0]
      }`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overview: movie.overview,
          tmdb: movie.id,
        }),
      }
    )
      .then((res) => {
        setLoading(false)
        if (res.status === 201) {
          router.push(
            `/movies/${movie.title.replace(/\s+/g, '-').toLowerCase()}-${
              movie.release_date.split('-')[0]
            }`
          )
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
    <div className="grid md:grid-cols-6 pt-5 md:p-5 gap-4">
      <div className="col-span-6 md:col-span-1">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} //185x278
          alt={`${movie.title} movie poster`}
          width={165}
          height={247}
        />
      </div>
      <div className="col-span-5">
        <h3>{movie.title}</h3>
        <p>Release date: {movie.release_date}</p>
        <p>{movie.overview}</p>
        {loading ? (
          <Loading small={true} />
        ) : error ? (
          <p className="ml-5 text-red-700 font-bold">
            Something went wrong, reload the page to try again
          </p>
        ) : (
          <OnClickButton text="Add movie" onClick={() => handleClick()} />
        )}
      </div>
    </div>
  )
}
