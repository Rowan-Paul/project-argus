import useReactSimpleMatchMedia from 'react-simple-matchmedia'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import Item from '../Item'
import { titleCase } from '../../lib/utils'

export default function HistoryMovies({ user }) {
  const [error, seterror] = useState(false)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchTMDB(tmdb_id) {
    return await fetch(`
    https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((res) => res.poster_path)
      .catch((err) => {})
  }

  useEffect(() => {
    fetch(`/api/history/${user}/movies`)
      .then((res) => res.json())
      .then((data) => {
        if (movies.length >= data.length) return

        setMovies([])
        data.forEach((item) => {
          fetch(`/api/movies/${item.movie_id.toString()}`)
            .then((res) => res.json())
            .then((res) => {
              res.title = titleCase(res.title)
              res.datetime = item.datetime

              let newArr = movies
              newArr.push(res)

              newArr.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.datetime) - new Date(a.datetime)
              })

              newArr.forEach(async (movie) => {
                if (movie.tmdb_id) {
                  const results = await fetchTMDB(movie.tmdb_id)
                  movie.poster_path = results
                }
              })

              setMovies([...newArr])
              setLoading(false)
            })
            .catch((err) => seterror(true))
        })
      })
  }, [])

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

  if (error) return <div>Failed to load</div>
  if (loading) {
    return (
      <>
        <h2 className="my-5">Movies</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="my-5 text-left w-full">
      <h2>Recently watched movies</h2>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center p-6 mt-2 bg-accent rounded-2xl ">
        {Object.values(movies)
          .splice(0, columns)
          .map((movie, i) => (
            <span key={movie.title + movie.datetime + i}>
              <Item
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
                {movie.datetime ? formatDate(movie.datetime) : ''}
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
