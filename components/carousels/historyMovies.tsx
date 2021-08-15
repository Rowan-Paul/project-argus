import useSWR from 'swr'
import useReactSimpleMatchMedia from 'react-simple-matchmedia'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import Movie from './Movie'
import { titleCase } from '../../lib/utils'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function HistoryMovies({ user }) {
  const [fetchMovieError, setFetchMovieError] = useState(false)
  const [movies, setMovies] = useState([])
  const { data, error } = useSWR(`/api/history/${user}/movies`, fetcher)

  useEffect(() => {
    if (!data) return

    setMovies([])

    data.forEach((item) => {
      fetch(`/api/movies/${item.movie_id.toString()}`)
        .then((res) => res.json())
        .then((res) => {
          res.title = titleCase(res.title)
          res.datetime = item.datetime

          let newArr = movies
          newArr.push(res)
          setMovies([...newArr])
        })
        .catch((err) => setFetchMovieError(true))
    })
  }, [data])

  const sm = useReactSimpleMatchMedia('(min-width: 640px)')
  const md = useReactSimpleMatchMedia('(min-width: 768px)')
  const lg = useReactSimpleMatchMedia('(min-width: 1024px)')
  const xl = useReactSimpleMatchMedia('(min-width: 1280px)')

  let columns = 2

  if (xl) {
    columns = 6
  } else if (lg) {
    columns = 5
  } else if (md) {
    columns = 4
  } else if (sm) {
    columns = 3
  } else {
    columns = 2
  }

  if (error || fetchMovieError) return <div>Failed to load</div>
  if (!data) {
    return (
      <>
        <h2 className="my-5">Movies</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="my-5 text-left w-full">
      <h2>Movies</h2>
      <div className="grid grid-cols-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-2 mt-2">
        {Object.values(movies)
          .splice(0, columns)
          .map((movie: any, i) => (
            <span key={movie.title + movie.datetime + i}>
              <Movie
                title={movie.title}
                url={`/movies/${movie.title
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${movie.year}`}
                image={
                  movie.poster_path
                    ? movie.poster_path
                    : 'http://via.placeholder.com/185x278?text=No%20Poster'
                }
              />
              <span className="text-sm w-full">
                {formatDate(movie.datetime)}
              </span>
            </span>
          ))}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleString([], options)
}
