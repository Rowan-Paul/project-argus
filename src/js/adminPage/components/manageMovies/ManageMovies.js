import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateBackdrop } from '../../../redux/main/actions'
import { clearActiveMovies } from '../../../redux/movies/actions'
import { AddMovieModal } from './AddMovieModal'
import { EditMovieModal } from './EditMovieModal'

function ManageMoviesUI(props) {
  const [addMoviePosition, setAddMoviePosition] = useState('hidden')
  const [editMoviePosition, setEditMoviePosition] = useState('hidden')

  // Let the user close the modal by clicking
  // outside of the modal or pressing escape
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setAddMoviePosition('hidden')
        setEditMoviePosition('hidden')
        props.clearActiveMovies()
      }
    })

    document.addEventListener(
      'click',
      function (event) {
        if (
          (!event.target.closest('#modal') &&
            !event.target.closest('#button')) ||
          event.target.closest('#crossIcon')
        ) {
          setAddMoviePosition('hidden')
          setEditMoviePosition('hidden')
          props.clearActiveMovies()
        }
      },
      false
    )
  }, [props])

  return (
    <div className="mb-10 md:mb-auto">
      <h2>Manage movies</h2>
      <p>
        You can add, remove or edit movies by searching for them here. You can
        also refresh the backdrops, though this is also done automatically every
        24 hours.
      </p>

      <span
        id="button"
        className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 inline-block mr-5 mb-5"
        onClick={() => setAddMoviePosition('fixed')}
      >
        Manually Add
      </span>

      <span
        id="button"
        className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 inline-block mr-5 mb-5"
        onClick={() => setEditMoviePosition('fixed')}
      >
        Edit or Remove
      </span>

      <span
        id="button"
        className="bg-black text-white dark:bg-white dark:text-black cursor-pointer p-2.5 inline-block"
        onClick={() => props.updateBackdrop()}
      >
        Update backdrop
      </span>

      <AddMovieModal
        position={addMoviePosition}
        setPosition={() => setAddMoviePosition('hidden')}
      />

      <EditMovieModal
        position={editMoviePosition}
        setPosition={() => setEditMoviePosition('hidden')}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  clearActiveMovies: () => dispatch(clearActiveMovies()),
  updateBackdrop: () => dispatch(updateBackdrop()),
})

export const ManageMovies = connect(null, mapDispatchToProps)(ManageMoviesUI)
