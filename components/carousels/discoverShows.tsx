import useSWR from 'swr'
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

export default function DiscoverShows() {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <>
        <h2 className="my-5">Shows</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="m-5 md:my-5">
      <h2>Shows</h2>
      <div className="p-6 mt-2 grid gap-6 grid-flow-col grid-cols-auto auto-cols-10 overflow-x-auto overflow-y-hidden scrollbar md:scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-700 scrollbar-track-white scrollbar-thumb-rounded-full bg-accent rounded-2xl">
        {Object.values(data.results).map((show: any) => (
          <Show
            key={show.name}
            title={show.name}
            url={`/shows/${show.name.replace(/\s+/g, '-').toLowerCase()}-${
              show.first_air_date.split('-')[0]
            }`}
            image={show.poster_path}
          />
        ))}
      </div>
    </div>
  )
}
