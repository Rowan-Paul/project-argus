import { useState } from 'react'
import { connect } from 'react-redux'
import { SmallInput } from '../../components/inputFields/SmallInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'
import { searchMovie } from '../../redux/movies/actions'

function SearchBoxUI(props) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex mt-5">
      <SmallInput
        name=""
        type="text"
        placeholder="Search for a movie"
        onChange={(e) => setQuery(e)}
      />

      <span className="ml-5">
        <SubmitButton
          name={'Search'}
          onClick={() => props.searchMovie(query)}
        />
      </span>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  searchMovie: (query) => dispatch(searchMovie(query)),
})

export const SearchBox = connect(null, mapDispatchToProps)(SearchBoxUI)
