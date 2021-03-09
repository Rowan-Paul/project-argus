function AboutUI() {
  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>About</h1>
      <p>
        project argus tracks everything for you; movies, tv shows, music,
        podcasts, audiobooks and games. All in a modern, open source web
        application. project argus is a side project for me,{' '}
        <a href="rowanpaulflynn.com">Rowan Paul</a>. I work on this during my
        spare time because I like to program things. For version management I
        use GitHub and since this entire project is open source, you can see all
        the source code in the{' '}
        <a
          href="https://github.com/Rowan-Paul/project-argus"
          target="_blank"
          rel="noopener noreferrer"
        >
          different repositories
        </a>
        . You can also request features or report bugs there by creating an
        issue.
      </p>
      <h2>Contact</h2>
      <p>You can contact me using the form below.</p>
      <h2>Donations</h2>
      <p>
        If you wish to support this project or just buy me a cup of tea, you can
        do so by donating here using credit card, iDeal or PayPal. All
        donations, however small are greatly appreciated.
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

export const About = AboutUI
