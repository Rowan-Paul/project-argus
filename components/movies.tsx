import useSWR from 'swr'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LoadButton, OnClickButton } from './buttons'
import router from 'next/router'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function DiscoverMovies() {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="my-5">
      <h2>Movies</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 my-2 mx-5 justify-center">
        {Object.values(data.results)
          .slice(0, 6)
          .map((movie) => (
            <Movie
              key={movie.title}
              title={movie.title}
              year={movie.release_date}
              image={movie.poster_path}
            />
          ))}
      </div>
    </div>
  )
}

export function Movie({ title, year, image }) {
  return (
    <Link
      href={`movies/${title.replace(/\s+/g, '-').toLowerCase()}-${
        year.split('-')[0]
      }`}
    >
      <a className="md:p-2 lg:p-5 no-underline">
        <div className="flex justify-center align-middle">
          <Image
            src={`https://image.tmdb.org/t/p/w185/${image}`} //185x278
            alt={`${title} movie poster}`}
            width={165}
            height={247}
          />
        </div>
        <p className="line-clamp-1">{title}</p>
      </a>
    </Link>
  )
}

export function SearchResults({ title, year }) {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="my-5 text-left">
      <h2>Results</h2>
      <div className="">
        {Object.values(data.results)
          .slice(0, 6)
          .map((movie) => (
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
    <div className="grid grid-cols-6 p-5 gap-4">
      <div className="">
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
          <LoadButton />
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
