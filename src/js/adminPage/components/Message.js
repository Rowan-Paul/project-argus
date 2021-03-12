import { connect } from 'react-redux'
import { deleteMessage, fetchMessages } from '../../redux/messages/actions'

function MessageUI(props) {
  const date = new Date(props.date).toLocaleString()
  const binIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )

  return (
    <div className="lg:grid grid-cols-6 border-black dark:border-white border-b-2 lg:p-5 mb-5">
      <div className="col-span-5">
        <h3>{props.name}</h3>
        <span
          className="p-1 cursor-pointer block"
          onClick={() => {
            props.deleteMessage(props.id)
            props.fetchMessages()
          }}
        >
          {binIcon}
        </span>
        <span>{date}</span>
        <p>{props.message}</p>
      </div>

      <a
        href={`mailto:${props.email}`}
        className="bg-black text-white dark:bg-white dark:text-black p-5 no-underline mb-5 inline-block lg:m-auto"
      >
        Answer
      </a>
    </div>
  )
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
})

const mapDispatchToProps = (dispatch) => ({
  deleteMessage: (message) => dispatch(deleteMessage(message)),
  fetchMessages: () => dispatch(fetchMessages()),
})

export const Message = connect(mapStateToProps, mapDispatchToProps)(MessageUI)
