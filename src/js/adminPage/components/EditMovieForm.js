import { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { LargeInput } from '../../components/inputFields/LargeInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'
import { TextArea } from '../../components/inputFields/TextArea'
import { setNotice } from '../../redux/main/actions'
import { editMovie } from '../../redux/movies/actions'

function EditMovieFormUI(props) {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [overview, setOverview] = useState('')
  const [poster, setPoster] = useState('')

  useEffect(() => {
    props.activeMovies.forEach((movie) => {
      if (movie._id === props.id) {
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
      <h3 id="editMovieFormTitle">Edit {title}</h3>
      <form id="editMovieForm">
        <div className="mt-5">
          <LargeInput
            name="Title"
            type="text"
            placeholder={title}
            onChange={(e) => setTitle(e)}
          />
          <LargeInput
            name="Year"
            type="Number"
            placeholder={year}
            onChange={(e) => setYear(e)}
          />
          <TextArea
            name="Overview"
            type="text"
            placeholder={overview}
            onChange={(e) => setOverview(e)}
          />
          <LargeInput
            name="Poster"
            type="text"
            placeholder={poster}
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
})

export const EditMovieForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMovieFormUI)
