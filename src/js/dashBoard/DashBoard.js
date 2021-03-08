import { useState } from 'react'
import { connect } from 'react-redux'
import { searchMovie } from '../redux/movies/actions'
import { MovieComponent } from './components/MovieComponent'

function DashboardUI(props) {
  const [query, setQuery] = useState('')

  let moviesArray = []

  if (props.activeMovies) {
    props.activeMovies.forEach((movie) => {
      moviesArray.push(
        <MovieComponent
          title={movie.title}
          overview={movie.overview}
          id={movie._id}
          isWatched={movie.isWatched}
        />
      )
    })
  }

  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Dashboard</h1>
      <p>An overview of things.</p>

      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="dark:text-black"
      />
      <button onClick={() => props.searchMovie(query)}>Search</button>

      <div className="grid lg:grid-cols-2 gap-10 mt-5">{moviesArray}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeMovies: state.movies.activeMovies,
})

const mapDispatchToProps = (dispatch) => ({
  searchMovie: (query) => dispatch(searchMovie(query)),
})

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI)
