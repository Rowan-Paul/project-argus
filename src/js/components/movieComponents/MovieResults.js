import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { MovieComponent } from './MovieComponent'

function MovieResultsUI(props) {
  const [columnAmount, setColumnAmount] = useState('')
  let moviesArray = []

  useEffect(() => {
    switch (props.columnAmount) {
      case 4:
        setColumnAmount('lg:grid-cols-4')
        break

      case 2:
        setColumnAmount('lg:grid-cols-2')
        break

      default:
        break
    }
  }, [props.columnAmount])

  if (props.activeMovies) {
    props.activeMovies.forEach((movie) => {
      moviesArray.push(
        <MovieComponent
          key={movie.title}
          title={movie.title}
          overview={movie.overview}
          id={movie._id}
          isWatched={movie.isWatched}
          poster={movie.poster}
          types={props.types}
          editMovieClicked={() => props.editMovieClicked(movie._id)}
        />
      )
    })
  }

  return <div className={`grid ${columnAmount} gap-5 mt-5`}>{moviesArray}</div>
}

const mapStateToProps = (state) => ({
  activeMovies: state.movies.activeMovies,
})

export const MovieResults = connect(mapStateToProps, null)(MovieResultsUI)
