import { useRouter } from 'next/router'
import Item from './Item'
import Loading from './loading'

export default function Seasons({ show, seasons, tmdb }) {
  const router = useRouter()

  if (tmdb?.length > 0) {
    return (
      <>
        <h2>Seasons</h2>
        <div className="py-5 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Object.values(seasons).map((season: any, i) => (
            <Item
              key={season.name}
              title={season.name}
              url={`/shows/${router.query.show}/seasons/${season.season_number}`}
              image={tmdb[i].poster_path}
            />
          ))}
        </div>
      </>
    )
  }

  return <Loading small={false} />
}
