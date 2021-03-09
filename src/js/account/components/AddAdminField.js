import { useState } from 'react'
import { connect } from 'react-redux'
import { SmallInput } from '../../components/inputFields/SmallInput'
import { SubmitButton } from '../../components/inputFields/SubmitButton'
import { fetchAddAdmin } from '../../redux/account/actions'

function AddAdminFieldUI(props) {
  const [newAdmin, setNewAdmin] = useState('')

  const addAdminClicked = (e) => {
    e.preventDefault()

    if (document.getElementById('addAdminForm').checkValidity()) {
      document.getElementById('addAdminForm').reset()
      props.addAdmin(newAdmin)
    } else {
      console.log('Username or id is required')

      props.setNotice({
        message: 'Username or id is required',
        type: 'error',
      })
    }
  }

  return (
    <form id="addAdminForm">
      <div className="flex mt-5">
        <SmallInput
          name=""
          type="text"
          placeholder="Enter username or user id"
          onChange={(e) => setNewAdmin(e)}
        />

        <span className="ml-5">
          <SubmitButton
            name={'Add Admin'}
            onClick={(e) => addAdminClicked(e)}
          />
        </span>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addAdmin: (newAdmin) => dispatch(fetchAddAdmin(newAdmin)),
})

export const AddAdminField = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAdminFieldUI)
