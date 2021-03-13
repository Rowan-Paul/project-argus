function AttributionsUI() {
  return (
    <div className="mb-10">
      <h2>Attributions</h2>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        alt="TMDB logo"
        className="w-full h-full m-5 inline lg:w-20 lg:h-20 lg:float-left "
      />
      <p>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
        <br></br>TMDb is a great resource to find everything related to movies
        and tv shows, go{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          check them out
        </a>
        .
      </p>
    </div>
  )
}

export const Attributions = AttributionsUI
