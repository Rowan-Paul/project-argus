import { useState } from 'react'
import { connect } from 'react-redux'
import { LargeInput } from '../../../components/inputFields/LargeInput'
import { SubmitButton } from '../../../components/inputFields/SubmitButton'
import { TextArea } from '../../../components/inputFields/TextArea'
import { setNotice } from '../../../redux/main/actions'
import { addMovie } from '../../../redux/movies/actions'

function AddMovieFormUI(props) {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [overview, setOverview] = useState('')
  const [poster, setPoster] = useState('')

  const addMovieClicked = (e) => {
    e.preventDefault()

    if (document.getElementById('addMovieForm').checkValidity()) {
      document.getElementById('addMovieForm').reset()
      props.addMovie({
        title: title,
        year: year,
        overview: overview,
        poster: poster,
      })
      props.onModalSubmit()
    } else {
      console.log('TItle and year are required')

      props.setNotice({
        message: 'TItle and year are required',
        type: 'error',
      })
    }
  }

  return (
    <form id="addMovieForm">
      <div className="mt-5">
        <LargeInput
          name="Title"
          type="text"
          placeholder="Enter full movie title"
          required={true}
          onChange={(e) => setTitle(e)}
        />
        <LargeInput
          name="Year"
          type="Number"
          placeholder="The year the movie was released"
          required={true}
          onChange={(e) => setYear(e)}
        />
        <TextArea
          name="Overview"
          type="text"
          placeholder="Add a short overview of the movie"
          onChange={(e) => setOverview(e)}
        />
        <LargeInput
          name="Poster"
          type="text"
          placeholder="Enter TMDB image link"
          onChange={(e) => setPoster(e)}
        />

        <SubmitButton name={'Add movie'} onClick={(e) => addMovieClicked(e)} />
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie) => dispatch(addMovie(movie)),
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const AddMovieForm = connect(null, mapDispatchToProps)(AddMovieFormUI)
