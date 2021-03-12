import { useState } from 'react'
import { connect } from 'react-redux'
import { LargeInput } from '../../components/inputFields/LargeInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'
import { setNotice } from '../../redux/main/actions'
import { addMovie } from '../../redux/movies/actions'

function AddMovieFieldUI(props) {
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
    } else {
      console.log('Fill in all fields')

      props.setNotice({
        message: 'FIll in all fields',
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
          onChange={(e) => setTitle(e)}
        />
        <LargeInput
          name="Year"
          type="Number"
          placeholder=""
          onChange={(e) => setYear(e)}
        />
        <LargeInput
          name="Overview"
          type="text"
          placeholder=""
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie) => dispatch(addMovie(movie)),
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const AddMovieField = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMovieFieldUI)
