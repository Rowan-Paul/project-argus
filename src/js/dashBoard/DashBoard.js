import { connect } from 'react-redux'
import { MovieComponent } from './components/MovieComponent'
import { SearchBox } from './components/SearchBox'

function DashboardUI(props) {
  let moviesArray = []

  if (props.activeMovies) {
    props.activeMovies.forEach((movie) => {
      moviesArray.push(
        <MovieComponent
          title={movie.title}
          overview={movie.overview}
          id={movie._id}
          isWatched={movie.isWatched}
          poster={movie.poster}
        />
      )
    })
  }

  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Dashboard</h1>

      <h2>Search for a movie</h2>
      <SearchBox />

      <div className="grid lg:grid-cols-2 gap-10 mt-5">{moviesArray}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeMovies: state.movies.activeMovies,
})

export const Dashboard = connect(mapStateToProps, null)(DashboardUI)
