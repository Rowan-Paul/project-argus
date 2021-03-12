import { connect } from 'react-redux'
import { markAsWatched } from '../../redux/movies/actions'
import { HashLink } from 'react-router-hash-link'

function ActionButtonsUI(props) {
  const addIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  )

  const addedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  )

  const removeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  let icons = []

  if (props.types.includes('history')) {
    icons.push(
      <div
        className="cursor-pointer mb-10"
        onClick={() => props.markAsWatched(props.id)}
        key="history"
      >
        {props.isWatched ? addedIcon : addIcon}
      </div>
    )
  }
  if (props.types.includes('edit')) {
    icons.push(
      <HashLink
        to="#editMovieFormTitle"
        smooth
        className="cursor-pointer mb-10"
        onClick={() => props.editMovieClicked()}
        key="edit"
      >
        {editIcon}
      </HashLink>
    )
  }
  if (props.types.includes('remove')) {
    icons.push(
      <div
        className="cursor-pointer mb-10"
        onClick={() => props.markAsWatched(props.id)}
        key="remove"
      >
        {removeIcon}
      </div>
    )
  }

  return <div className="w-5 m-auto">{icons}</div>
}

const mapDispatchToProps = (dispatch) => ({
  markAsWatched: (movie) => dispatch(markAsWatched(movie)),
})

export const ActionButtons = connect(null, mapDispatchToProps)(ActionButtonsUI)
