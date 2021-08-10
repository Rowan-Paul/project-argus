export default function MovieDetails({ tmdb }) {
  return (
    <>
      {tmdb.backdrop_path ? (
        <div className="grid mx-5 md:mx-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:my-5 gap-4">
          <div>
            <span className="font-bold">
              {Date.parse(tmdb.release_date) < Date.now()
                ? 'Released '
                : 'Status '}
            </span>
            <span className="text-sm">
              {Date.parse(tmdb.release_date) < Date.now()
                ? tmdb.release_date
                : tmdb.status}
            </span>
          </div>
          <div>
            <span className="font-bold">Runtime</span>{' '}
            <span className="text-sm">{tmdb.runtime} minutes</span>
          </div>
          <div>
            <span className="font-bold">Genres</span>{' '}
            <span className="text-sm">
              {tmdb.genres?.map((genre, i) => {
                if (tmdb.genres.length === i + 1) {
                  return genre.name
                } else {
                  return `${genre.name}, `
                }
              })}
            </span>
          </div>
          <div>
            <span className="font-bold">Studios</span>{' '}
            <span className="text-sm">
              {tmdb.production_companies?.map((studio, i) => {
                if (tmdb.production_companies.length === i + 1) {
                  return studio.name
                } else {
                  return `${studio.name}, `
                }
              })}
            </span>
          </div>
        </div>
      ) : (
        <div className="mx-5 md:mx-0 mt-5">
          It seems we can't find a tmdb entry for this movie and are thus
          missing some info. You can add it to your history like normal.
        </div>
      )}
    </>
  )
}
