import ItemHorizontal from '../item-horizontal/item-horizontal'

interface IEpisodesProps {
  episodes: IEpisode[]
  season: number
  show: string
}

interface IEpisode {
  name: string
  tmdb_id: string
  episode_number: number
  still_path?: string
}

const Episodes = (props: IEpisodesProps): JSX.Element => {
  return (
    <div className="m-5">
      <h2>Episodes</h2>
      <div className="grid gap-6 mt-2 ">
        {Object.values(props.episodes).map((episode: any, i) => (
          <ItemHorizontal
            name={episode?.name}
            title={`${props.season}x${episode.episode_number} ${episode.name}`}
            image={episode?.still_path}
            subtitle={`Air date: ${formatDate(episode.air_date)}`}
            url={`/shows/${props.show}/seasons/${props.season}/episodes/${i + 1}`}
            key={episode.name}
            description={episode.overview}
          />
        ))}
      </div>
    </div>
  )
}

export default Episodes

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}
