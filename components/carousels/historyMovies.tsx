import useSWR from 'swr'
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
    <div className="m-5 md:my-5">
      <h2>Movies</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 my-2 md:mx-5 justify-center">
        {Object.values(movies)
          .slice(0, 6)
          .map((movie: any) => (
            <Movie
              key={movie.title + movie.datetime}
              title={movie.title}
              datetime={movie.datetime}
              url={`/movies/${movie.title.replace(/\s+/g, '-').toLowerCase()}-${
                movie.year
              }`}
              image={
                movie.poster_path
                  ? movie.poster_path
                  : 'http://via.placeholder.com/185x278?text=No%20Poster'
              }
            />
          ))}
      </div>
    </div>
  )
}
