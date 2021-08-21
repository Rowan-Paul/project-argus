export default function ItemDetails({ tmdb }) {
  if (!tmdb.backdrop_path) {
    return (
      <div className="mx-5 md:mx-0 mt-5">
        It seems we can't find a tmdb entry for this movie and are thus missing
        some info. You can add it to your history like normal.
      </div>
    )
  }

  if (tmdb.title) {
    return (
      <>
        <div className="grid mx-5 md:mx-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:my-5 gap-4">
          <Detail
            title={
              Date.parse(tmdb.release_date) < Date.now()
                ? 'Released '
                : 'Status '
            }
            text={
              Date.parse(tmdb.release_date) < Date.now()
                ? formatDate(tmdb.release_date)
                : tmdb.status
            }
          />
          <Detail title="Runtime" text={`${tmdb.runtime} minutes`} />
          <Detail
            title="Genres"
            text={tmdb.genres?.map((genre, i) => {
              if (tmdb.genres.length === i + 1) {
                return genre.name
              } else {
                return `${genre.name}, `
              }
            })}
          />
          <Detail
            title="Studios"
            text={tmdb.production_companies?.map((studio, i) => {
              if (tmdb.production_companies.length === i + 1) {
                return studio.name
              } else {
                return `${studio.name}, `
              }
            })}
          />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="grid mx-5 md:mx-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:my-5 gap-4">
          {tmdb.first_air_date ? (
            <Detail title="Premiered" text={formatDate(tmdb.first_air_date)} />
          ) : (
            ''
          )}
          <Detail title="Status" text={tmdb.status} />
          <Detail title="Runtime" text={`${tmdb.episode_run_time} minutes`} />
          <Detail
            title="Genres"
            text={tmdb.genres?.map((genre, i) => {
              if (tmdb.genres.length === i + 1) {
                return genre.name
              } else {
                return `${genre.name}, `
              }
            })}
          />
          <Detail
            title="Studios"
            text={tmdb.production_companies?.map((studio, i) => {
              if (tmdb.production_companies.length === i + 1) {
                return studio.name
              } else {
                return `${studio.name}, `
              }
            })}
          />
        </div>
      </>
    )
  }
}

function Detail({ title, text }) {
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
  return new Date(dateString).toLocaleString([], options)
}