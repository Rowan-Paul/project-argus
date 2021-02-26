import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSignUp } from '../../redux/account/actions'
import { LargeInput } from './LargeInput'
import { SmallInput } from './SmallInput'
import { SubmitButton } from './SubmitButton'
import { setNotice } from '../../redux/main/actions'

function SignUpFieldUI(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const signUpClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('signUpForm').checkValidity()) {
      props.fetchSignUp(firstName, lastName, email, password)

      props.setNotice({
        message: 'Signed up',
        type: 'success',
      })
    } else {
      console.log('Please fill in all fields')

      props.setNotice({ message: 'Please fill in all fields', type: 'error' })
    }
  }

  return (
    <div className="w-full">
      <form
        id="signUpForm"
        className="mb-4 lg:flex lg:flex-wrap lg:justify-between"
      >
        <SmallInput
          name="First name"
          type="text"
          placeholder="John"
          onChange={(e) => setFirstName(e)}
        />

        <SmallInput
          name="Last Name"
          type="text"
          placeholder="Doe"
          last="true"
          onChange={(e) => setLastName(e)}
        />

        <LargeInput
          name="Email"
          type="email"
          placeholder="johndoe@example.com"
          onChange={(e) => setEmail(e)}
        />

        <LargeInput
          name="Password"
          type="password"
          placeholder=""
          onChange={(e) => setPassword(e)}
        />

        <SubmitButton
          name={'Create an account'}
          onClick={(e) => signUpClicked(e)}
        />
      </form>

      <Link className="block w-full text-center text-sm" to="/signin">
        Already have an account?
      </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchSignUp: (firstName, lastName, email, password) =>
    dispatch(fetchSignUp(firstName, lastName, email, password)),
  setNotice: (error) => dispatch(setNotice(error)),
})

export const SignUpField = connect(null, mapDispatchToProps)(SignUpFieldUI)
