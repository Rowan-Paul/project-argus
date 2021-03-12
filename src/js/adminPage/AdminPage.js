import { connect } from 'react-redux'
import { AddAdmin } from './components/addAdmin/AddAdmin'
import { UserMessages } from './components/userMessages/UserMessages'
import { ManageMovies } from './components/manageMovies/ManageMovies'
import { Donations } from './components/donations/Donations'

function AdminPageUI(props) {
  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Admin</h1>
      <p>
        Hi there {props.firstName}, on this page you can administrate the site.
      </p>
      <div className="lg:grid grid-cols-2 gap-10 lg:p-10">
        <AddAdmin />
        <UserMessages />
        <ManageMovies />
        <Donations />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  firstName: state.account.user.firstName,
})

export const AdminPage = connect(mapStateToProps, null)(AdminPageUI)
