import useSWR from 'swr'
import Image from 'next/image'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Movies() {
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
              image={movie.poster_path}
            />
          ))}
      </div>
    </div>
  )
}

export function Movie({ title, image }) {
  return (
    <div className="md:p-2 lg:p-5">
      <div className="flex justify-center align-middle">
        <Image
          src={`https://image.tmdb.org/t/p/w185/${image}`} //185x278
          alt={`${title} movie poster}`}
          width={165}
          height={247}
        />
      </div>
      <p className="line-clamp-1">{title}</p>
    </div>
  )
}
