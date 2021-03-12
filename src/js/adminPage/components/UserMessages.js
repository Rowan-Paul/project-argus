import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMessages } from '../../redux/messages/actions'
import { MessagesModal } from './MessagesModal'

function UserMessagesUI(props) {
  const [position, setPosition] = useState('hidden')

  useEffect(() => {
    props.fetchMessages()
  }, [props])

  if (props.messages.length > 0) {
    return (
      <div className="mb-10">
        <h2>User messages</h2>
        <p>These are messages left by users on the about page.</p>
        <span
          className="underline cursor-pointer"
          id="button"
          onClick={() => setPosition('fixed')}
        >
          Read the last message by {props.messages[0].name}
        </span>
        <MessagesModal
          position={position}
          setPosition={() => setPosition('hidden')}
        />
      </div>
    )
  }
  return (
    <div className="mb-5">
      <h2>User messages</h2>
      <p>These are messages left by users on the about page.</p>
      <span>There are no messages left by users</span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
})

export const UserMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMessagesUI)
