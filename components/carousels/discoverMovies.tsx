import useSWR from 'swr'
import Loading from '../loading'
import Item from '../Item'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function DiscoverMovies() {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
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
      <div className="p-6 mt-2 grid gap-6 grid-flow-col grid-cols-auto auto-cols-10 overflow-x-auto overflow-y-hidden scrollbar md:scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-700 scrollbar-track-white scrollbar-thumb-rounded-full bg-accent rounded-2xl">
        {Object.values(data.results).map((movie: any) => (
          <Item
            key={movie.title}
            title={movie.title}
            url={`movies/${movie.title
              .replace(/[^a-zA-Z0-9 !]+/g, '')
              .replace(/\s+/g, '-')
              .toLowerCase()}-${movie.release_date.split('-')[0]}`}
            image={movie.poster_path}
          />
        ))}
      </div>
    </div>
  )
}
