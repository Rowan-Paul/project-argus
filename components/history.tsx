import useReactSimpleMatchMedia from 'react-simple-matchmedia'
import { useEffect, useState } from 'react'
import { titleCase } from '../lib/utils'
import Item from './item'
import Loading from './loading'

export function History({ type, user }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [itemsAmount, setItemsAmount] = useState(4)

  async function fetchTMDB(tmdb_id, season) {
    if (type === 'movies') {
      return await fetch(`
    https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((res) => res.poster_path)
        .catch((err) => setError(true))
    } else if (type === 'shows') {
      return await fetch(
        `https://api.themoviedb.org/3/tv/${tmdb_id}/season/${season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((res) => res.poster_path)
        .catch((err) => setError(true))
    }
  }

  async function fetchMovieDetails(item) {
    return fetch(`/api/movies/${item.movie_id.toString()}`)
      .then((res) => res.json())
      .then(async (res) => {
        res.title = titleCase(res.title)
        res.datetime = item.datetime

        if (res.tmdb_id) {
          const poster = await fetchTMDB(res.tmdb_id, 0)
          res.poster = poster
        }

        let tempItems = items
        tempItems.push(res)

        tempItems.sort(function (a, b) {
          return Date.parse(b.datetime) - Date.parse(a.datetime)
        })

        setItems([...tempItems])
        setLoading(false)
      })
      .catch((err) => setError(true))
  }

  async function fetchShowDetails(item) {
    return fetch(`/api/episodes/${item.episode_id.toString()}`)
      .then((res) => res.json())
      .then(async (res) => {
        res.name = titleCase(res.name)
        res.datetime = item.datetime

        if (res.tmdb_id) {
          const poster = await fetchTMDB(res.show_tmdb, res.season_number)
          res.poster = poster
        }

        let tempItems = items
        tempItems.push(res)

        tempItems.sort(function (a, b) {
          return Date.parse(b.datetime) - Date.parse(a.datetime)
        })

        setItems([...tempItems])
        setLoading(false)
      })
      .catch((err) => setError(true))
  }

  const lg = useReactSimpleMatchMedia('(min-width: 1024px)')

  if (lg && itemsAmount !== 6) {
    setItemsAmount(6)
    setItems([])
  }
  if (!lg && itemsAmount !== 4) {
    setItemsAmount(4)
    setItems([])
  }

  useEffect(() => {
    fetch(`/api/history/${user}/${type}?amount=${itemsAmount}`)
      .then((res) => res.json())
      .then((data) => {
        if (items.length >= data.length) return

        setItems([])
        data.forEach((item) => {
          if (type === 'movies') {
            fetchMovieDetails(item)
          } else if (type === 'shows') {
            fetchShowDetails(item)
          }
        })
      })
  }, [itemsAmount])

  if (error) {
    return (
      <div className="my-5 text-left w-full">
        <h2 className="my-5">{titleCase(type)}</h2>
        <p>Something went wrong...</p>
      </div>
    )
  }
  if (!loading) {
    return (
      <div className="my-5 text-left w-full">
        <h2>Recently watched {type}</h2>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center p-6 mt-2 bg-accent rounded-2xl ">
          {Object.values(items).map((item, i) => (
            <span key={item.title ? item.title : item.name + item.datetime + i}>
              <Item
                title={
                  item.title
                    ? item.title
                    : `${item.season_number}x${item.episode_number} ${item.name}`
                }
                url={`/${type}/${
                  item.title
                    ? item.title
                    : item.show_name
                        .replace(/[^a-zA-Z0-9 !]+/g, '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()
                }-${item.year ? item.year : item.show_year}${
                  item.season_number
                    ? `/seasons/${item.season_number}/episodes/${item.episode_number}`
                    : ''
                }`}
                image={item.poster}
              />
              <span className="text-sm w-full block">
                {item.show_name ? titleCase(item.show_name) : ''}
              </span>
              <span className="text-sm w-full">
                {item.datetime ? formatDate(item.datetime) : ''}
              </span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 className="my-5">{titleCase(type)}</h2>
      <Loading small={false} />
    </>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleString([], options)
}
