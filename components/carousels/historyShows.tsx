import useReactSimpleMatchMedia from 'react-simple-matchmedia'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import Item from '../Item'
import { titleCase } from '../../lib/utils'

export default function HistoryShow({ user }) {
  const [error, seterror] = useState(false)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [poster, setPoster] = useState()

  async function fetchTMDB(tmdb_id, season) {
    return await fetch(
      `
    https://api.themoviedb.org/3/tv/${tmdb_id}/season/${season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((res) => res.poster_path)
      .catch((err) => {})
  }

  useEffect(() => {
    fetch(`/api/history/${user}/shows`)
      .then((res) => res.json())
      .then((data) => {
        if (episodes.length >= data.length) return

        setEpisodes([])
        data.forEach((item) => {
          fetch(`/api/episodes/${item.episode_id}`)
            .then((res) => res.json())
            .then((res) => {
              res.name = titleCase(`${res.show_name} - ${res.name}`)
              res.datetime = item.datetime

              let newArr = episodes
              newArr.push(res)

              newArr.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.datetime) - new Date(a.datetime)
              })

              newArr.forEach(async (episode) => {
                if (episode.tmdb_id) {
                  const results = await fetchTMDB(
                    episode.show_tmdb,
                    episode.season_number,
                    episode.episode_number
                  )
                  setPoster(results)
                }
              })

              setEpisodes([...newArr])
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

  if (error)
    return (
      <>
        <h2 className="my-5">Shows</h2>
        <p>Failed to load</p>
      </>
    )
  if (loading) {
    return (
      <>
        <h2 className="my-5">Shows</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="my-5 text-left w-full">
      <h2>Recently watched shows</h2>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center p-6 mt-2 bg-accent rounded-2xl ">
        {Object.values(episodes)
          .splice(0, columns)
          .map((episode, i) => (
            <span key={episode.name + episode.datetime + i}>
              <Item
                title={episode.name}
                url={`/shows/${episode.show_name
                  .replace(/[^a-zA-Z0-9 !]+/g, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${episode.show_year}/seasons/${
                  episode.season_number
                }/episodes/${episode.episode_number}`}
                image={poster}
              />
              <span className="text-sm w-full">
                {episode.datetime ? formatDate(episode.datetime) : ''}
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
