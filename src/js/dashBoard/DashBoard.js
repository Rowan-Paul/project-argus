import { useState } from 'react'
import { connect } from 'react-redux'
import { markAsWatched, searchMovie } from '../redux/movies/actions'

function DashboardUI(props) {
  const [query, setQuery] = useState('')

  let moviesArray = []

  if (props.activeMovies) {
    props.activeMovies.forEach((movie) => {
      moviesArray.push(
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <button onClick={() => props.markAsWatched(movie.title)}>
            {movie.isWatched ? 'Watched' : 'Mark as watched'}
          </button>
        </div>
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

      {moviesArray}
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeMovies: state.movies.activeMovies,
})

const mapDispatchToProps = (dispatch) => ({
  markAsWatched: (movie) => dispatch(markAsWatched(movie)),
  searchMovie: (query) => dispatch(searchMovie(query)),
})

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUI)
