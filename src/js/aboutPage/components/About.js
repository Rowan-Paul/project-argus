import { Fragment } from 'react'

function AboutUI() {
  return (
    <Fragment>
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
    </Fragment>
  )
}

export const About = AboutUI
