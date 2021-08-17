import { useRouter } from 'next/router'
import ItemHorizontal from './ItemHorizontal'
import Loading from './loading'

export default function Episodes({ season, episodes, tmdb }) {
  const router = useRouter()
  if (tmdb?.length > 0) {
    return (
      <div className="m-5">
        <h2>Episodes</h2>
        <div className="grid gap-6 mt-2 ">
          {Object.values(episodes).map((episode: any, i) => (
            <ItemHorizontal
              item={episode}
              image={tmdb[i].still_path}
              season={season}
              url={`/shows/${router.query.show}/seasons/${
                router.query.season
              }/episodes/${i + 1}`}
              key={episode.name}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 className="my-2">Episodes</h2>
      <Loading small={false} />
    </>
  )
}
