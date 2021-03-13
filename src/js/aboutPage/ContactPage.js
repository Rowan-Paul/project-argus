import { useState } from 'react'
import { connect } from 'react-redux'
import { SmallInput } from '../components/inputFields/SmallInput'
import { SubmitButton } from '../components/inputFields/SubmitButton'
import { TextArea } from '../components/inputFields/TextArea'
import { setNotice } from '../redux/main/actions'
import { sendMessage } from '../redux/messages/actions'

function ContactPageUI(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMessageClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('contactForm').checkValidity()) {
      document.getElementById('contactForm').reset()

      props.sendMessage({ name: name, email: email, message: message })

      props.setNotice({
        message: 'Send message',
        type: 'success',
      })
      props.history.push('/')
    } else {
      console.log('Please fill in all fields')

      props.setNotice({
        message: 'Please fill in all fields',
        type: 'error',
      })
    }
  }

  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Contact form</h1>
      <div className="lg:w-1/2">
        <form
          id="contactForm"
          className="mb-4 lg:flex lg:flex-wrap lg:justify-between"
        >
          <SmallInput
            name="Name"
            type="text"
            placeholder="John"
            required={true}
            onChange={(e) => setName(e)}
          />
          <SmallInput
            name="Email"
            type="email"
            placeholder="johndoe@example.com"
            required={true}
            last="true"
            onChange={(e) => setEmail(e)}
          />
          <TextArea
            name="Message"
            type="text"
            placeholder="Enter your message"
            required={true}
            onChange={(e) => setMessage(e)}
          />

          <SubmitButton
            name={'Send a message'}
            onClick={(e) => sendMessageClicked(e)}
          />
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) => dispatch(sendMessage(message)),
  setNotice: (error) => dispatch(setNotice(error)),
})

export const ContactPage = connect(null, mapDispatchToProps)(ContactPageUI)
