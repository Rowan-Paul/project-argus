import { useState } from 'react'
import { connect } from 'react-redux'
import { SmallInput } from '../../../components/inputFields/SmallInput'
import { SubmitButton } from '../../../components/inputFields/SubmitButton'
import { fetchAddAdmin } from '../../../redux/account/actions'
import { setNotice } from '../../../redux/main/actions'

function AddAdminFormUI(props) {
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
      <div className="flex mt-5 flex-wrap">
        <SmallInput
          name=""
          type="text"
          placeholder="Enter username or user id"
          required={true}
          onChange={(e) => setNewAdmin(e)}
        />

        <span className="md:ml-5">
          <SubmitButton
            name={'Add Admin'}
            onClick={(e) => addAdminClicked(e)}
          />
        </span>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addAdmin: (newAdmin) => dispatch(fetchAddAdmin(newAdmin)),
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const AddAdminForm = connect(null, mapDispatchToProps)(AddAdminFormUI)
