import { useState } from 'react'
import { connect } from 'react-redux'
import { SmallInput } from '../inputFields/SmallInput'
import { SubmitButton } from '../inputFields/SubmitButton'
import { setNotice } from '../../redux/main/actions'
import { searchMovie } from '../../redux/movies/actions'

function SearchBoxUI(props) {
  const [query, setQuery] = useState('')

  const searchedClicked = (e) => {
    e.preventDefault()

    if (document.getElementById('searchForm').checkValidity()) {
      document.getElementById('searchForm').reset()
      props.searchMovie(query)
    } else {
      console.log('Search field is required')

      props.setNotice({
        message: 'Search field is required',
        type: 'error',
      })
    }
  }

  return (
    <form id="searchForm">
      <div className="md:flex mt-5">
        <SmallInput
          name=""
          type="text"
          placeholder="Search for a movie"
          onChange={(e) => setQuery(e)}
        />

        <span className="md:ml-5">
          <SubmitButton name={'Search'} onClick={(e) => searchedClicked(e)} />
        </span>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  searchMovie: (query) => dispatch(searchMovie(query)),
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const SearchBox = connect(null, mapDispatchToProps)(SearchBoxUI)
