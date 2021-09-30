interface IItemDetailsProps {
  tmdb: {
    backdrop_path?: string | null
    tagline?: string | null
    title?: string
    release_date?: string
    status?: string
    runtime?: number | null
    genres?: IGenre[]
    production_companies?: IProductionCompany[]
    first_air_date?: string
    episode_run_time?: number[]
  }
}

interface IGenre {
  id?: number
  name?: string
}

interface IProductionCompany {
  name?: string
  id?: number
  logo_path?: string | null
  origin_country?: string
}

const ItemDetails = (props: IItemDetailsProps): JSX.Element => {
  if (props.tmdb?.title) {
    return (
      <>
        <div className="grid mx-5 md:mx-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:my-5 gap-4">
          <Detail
            title={Date.parse(props.tmdb?.release_date) < Date.now() ? 'Released ' : 'Status '}
            text={
              Date.parse(props.tmdb?.release_date) < Date.now()
                ? formatDate(props.tmdb?.release_date)
                : props.tmdb?.status
            }
          />
          <Detail title="Runtime" text={`${props.tmdb?.runtime != undefined && props.tmdb?.runtime} minutes`} />
          <Detail
            title="Genres"
            text={props.tmdb?.genres?.map((genre, i) => {
              if (props.tmdb?.genres.length === i + 1) {
                return genre?.name
              } else {
                return `${genre?.name}, `
              }
            })}
          />
          <Detail
            title="Studios"
            text={props.tmdb?.production_companies?.map((studio, i) => {
              if (props.tmdb?.production_companies.length === i + 1) {
                return studio?.name
              } else {
                return `${studio?.name}, `
              }
            })}
          />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="grid mx-5 md:mx-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4 md:my-5 gap-4">
          {props.tmdb?.first_air_date ? <Detail title="Premiered" text={formatDate(props.tmdb?.first_air_date)} /> : ''}
          <Detail title="Status" text={props.tmdb?.status} />
          <Detail title="Runtime" text={`${props.tmdb?.episode_run_time} minutes`} />
          <Detail
            title="Genres"
            text={props.tmdb?.genres?.map((genre, i) => {
              if (props.tmdb?.genres?.length === i + 1) {
                return genre.name
              } else {
                return `${genre.name}, `
              }
            })}
          />
          <Detail
            title="Studios"
            text={props.tmdb?.production_companies?.map((studio, i) => {
              if (props.tmdb?.production_companies?.length === i + 1) {
                return studio?.name
              } else {
                return `${studio?.name}, `
              }
            })}
          />
        </div>
      </>
    )
  }
}

function Detail({ title, text }) {
  if (text === undefined || text === 'undefined minutes') {
    return (
      <div>
        <span className="font-bold">{title} </span>
        <span className="text-sm">-</span>
      </div>
    )
  }

  return (
    <div>
      <span className="font-bold">{title} </span>
      <span className="text-sm">{text}</span>
    </div>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}

export default ItemDetails
