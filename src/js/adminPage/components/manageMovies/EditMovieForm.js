import { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { LargeInput } from '../../../components/inputFields/LargeInput'
import { SubmitButton } from '../../../components/inputFields/SubmitButton'
import { TextArea } from '../../../components/inputFields/TextArea'
import { setNotice } from '../../../redux/main/actions'
import { clearActiveMovies, editMovie } from '../../../redux/movies/actions'

function EditMovieFormUI(props) {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [overview, setOverview] = useState('')
  const [poster, setPoster] = useState('')
  const [oldMovie, setOldMovie] = useState('')

  useEffect(() => {
    props.activeMovies.forEach((movie) => {
      if (movie._id === props.id) {
        setOldMovie(movie)
        setTitle(movie.title)
        setYear(movie.year)
        setOverview(movie.overview)
        setPoster(movie.poster)
      }
    })
  }, [props.id, props.activeMovies])

  const editMovieClicked = (e) => {
    e.preventDefault()

    if (document.getElementById('editMovieForm').checkValidity()) {
      document.getElementById('editMovieForm').reset()
      props.clearActiveMovies()
      props.editMovie(props.id, {
        title: title,
        year: year,
        overview: overview,
        poster: poster,
      })
      props.onModalSubmit()
    } else {
      console.log('Fill in all fields')

      props.setNotice({
        message: 'FIll in all fields',
        type: 'error',
      })
    }
  }

  return (
    <Fragment>
      <h3 id="editMovieFormTitle">Edit {oldMovie.title}</h3>
      <form id="editMovieForm">
        <div className="mt-5 break-words">
          <LargeInput
            name={`Current title: ${oldMovie.title}`}
            type="text"
            placeholder="Title is required"
            required={true}
            onChange={(e) => setTitle(e)}
          />
          <LargeInput
            name={`Current year: ${oldMovie.year}`}
            type="Number"
            placeholder="Title is required"
            required={true}
            onChange={(e) => setYear(e)}
          />
          <TextArea
            name={`Current overview: ${overview}`}
            type="text"
            placeholder="Keep empty to remove"
            onChange={(e) => setOverview(e)}
          />
          <LargeInput
            name={`Current poster: ${oldMovie.poster}`}
            type="text"
            placeholder="Keep empty to remove"
            onChange={(e) => setPoster(e)}
          />

          <SubmitButton
            name={'Edit movie'}
            onClick={(e) => editMovieClicked(e)}
          />
        </div>
      </form>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  activeMovies: state.movies.activeMovies,
})

const mapDispatchToProps = (dispatch) => ({
  editMovie: (id, movie) => dispatch(editMovie(id, movie)),
  setNotice: (notice) => dispatch(setNotice(notice)),
  clearActiveMovies: () => dispatch(clearActiveMovies()),
})

export const EditMovieForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMovieFormUI)
