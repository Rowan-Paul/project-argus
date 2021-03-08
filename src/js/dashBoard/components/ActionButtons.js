import { connect } from 'react-redux'
import { markAsWatched } from '../../redux/movies/actions'

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

  return (
    <div
      className="flex-grow-0 cursor-pointer m-auto"
      onClick={() => props.markAsWatched(props.id)}
    >
      {props.isWatched ? addedIcon : addIcon}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  markAsWatched: (movie) => dispatch(markAsWatched(movie)),
})

export const ActionButtons = connect(null, mapDispatchToProps)(ActionButtonsUI)
