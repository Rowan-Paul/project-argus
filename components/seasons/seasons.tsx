import Item from '../item/item'

interface ISeasonsProps {
  seasons: season[]
  show: string
}

interface season {
  name: string
  season_number: number
}

const Seasons = (props: ISeasonsProps): JSX.Element => {
  return (
    <div className="m-5">
      <h2>Seasons</h2>
      <div className="py-5 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Object.values(props.seasons).map((season: any, i) => (
          <Item
            key={season.name}
            title={season.name}
            url={`/shows/${props.show}/seasons/${season.season_number}`}
            image={tmdbUrlify(season?.image)}
          />
        ))}
      </div>
    </div>
  )
}

function tmdbUrlify(image) {
  if (image?.indexOf('/') === 0) {
    return `https://image.tmdb.org/t/p/w185/${image}`
  } else {
    return image
  }
}

export default Seasons
