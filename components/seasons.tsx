import { useRouter } from 'next/router'
import Item from './Item'
import Loading from './loading'

export default function Seasons({ show, seasons, tmdb }) {
  const router = useRouter()

  if (tmdb?.length > 0) {
    return (
      <div className="m-5">
        <h2>Seasons</h2>
        <div className="py-5 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Object.values(seasons).map((season: any, i) => (
            <Item
              key={season.name}
              title={season.name}
              url={`/shows/${router.query.show}/seasons/${season.season_number}`}
              image={tmdb[i].poster_path}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 className="my-2">Seasons</h2>
      <Loading small={false} />
    </>
  )
}
