import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSignIn } from '../../redux/account/actions'
import { LargeInput } from '../../components/inputFields/LargeInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'
import { setNotice } from '../../redux/main/actions'

function SignInFormUI(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signInClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('signInForm').checkValidity()) {
      props.fetchSignIn(email, password)

      props.setNotice({
        message: 'Logged in',
        type: 'success',
      })
    } else {
      console.log('Email and/or password incorrect')

      props.setNotice({
        message: 'Email and/or password incorrect',
        type: 'error',
      })
    }
  }

  return (
    <div className="w-full">
      <form
        className="mb-4 lg:flex lg:flex-wrap lg:justify-between"
        id="signInForm"
      >
        <LargeInput
          name="Email"
          type="email"
          placeholder="johndoe@example.com"
          required={true}
          onChange={(e) => setEmail(e)}
        />

        <LargeInput
          name="Password"
          type="password"
          placeholder=""
          required={true}
          onChange={(e) => setPassword(e)}
        />

        <SubmitButton name={'Sign In'} onClick={(e) => signInClicked(e)} />
      </form>

      <Link className="block w-full text-center text-sm" to="/signup">
        Don't have an account?
      </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchSignIn: (email, password) => dispatch(fetchSignIn(email, password)),
  setNotice: (error) => dispatch(setNotice(error)),
})

export const SignInForm = connect(null, mapDispatchToProps)(SignInFormUI)
