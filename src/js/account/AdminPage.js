import { connect } from 'react-redux'
import { AddAdminField } from './components/AddAdminField'

function AdminPageUI(props) {
  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Admin</h1>
      <p>
        Hi there {props.firstName}, on this page you can administrate the site.
      </p>
      <div className="lg:grid grid-cols-2 gap-10 lg:p-10">
        <div>
          <h2>Add admin</h2>
          <p>
            You can select another account to become an administrator on this
            page.
          </p>

          <AddAdminField />
        </div>

        <div>
          <h2>User messages</h2>
          <p>These are messages left by users on the about page.</p>
        </div>

        <div>
          <h2>Manage movies</h2>
          <p>You can add, remove or edit movies by searching for them here.</p>
        </div>

        <div>
          <h2>Donations</h2>
          <p>Here you can see the latest donations</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  firstName: state.account.user.firstName,
})

const mapDispatchToProps = (dispatch) => ({})

export const AdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPageUI)
