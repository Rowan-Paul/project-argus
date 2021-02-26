function AboutUI() {
  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>About</h1>
      <p>
        project argus is a side project for me,{' '}
        <a href="rowanpaulflynn.com">Rowan Paul</a>. The website isn't finished
        by a long shot, but that also means you{' '}
        <a href="https://github.com/Rowan-Paul/project-argus">
          help develop this site by visiting the GitHub repo
        </a>
        .
      </p>
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
        <a href="https://www.themoviedb.org/">check them out</a>.
      </p>
    </div>
  )
}

export const About = AboutUI
