import { useState } from 'react'
import { connect } from 'react-redux'
import { fetchDelete } from '../../redux/account/actions'
import { setNotice } from '../../redux/main/actions'
import { LargeInput } from '../../components/inputFields/LargeInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'

function DeleteAccountFieldUI(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const deleteAccountClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('deleteAccountForm').checkValidity()) {
      props.fetchDelete(email, password)

      props.setNotice({
        message: 'Deleted account',
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
    <div className="lg:w-1/3 w-full">
      <form
        className="mb-4 lg:flex lg:flex-wrap lg:justify-between"
        id="deleteAccountForm"
      >
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
          name={'Delete account'}
          onClick={(e) => deleteAccountClicked(e)}
        />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchDelete: (email, password) => dispatch(fetchDelete(email, password)),
  setNotice: (error) => dispatch(setNotice(error)),
})

export const DeleteAccountField = connect(
  null,
  mapDispatchToProps
)(DeleteAccountFieldUI)
