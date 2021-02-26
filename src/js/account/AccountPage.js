import { connect } from 'react-redux'
import { fetchDelete } from '../redux/account/actions'
import { DeleteAccountField } from './components/DeleteAccountField'

function AccountPageUI(props) {
  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>Account</h1>
      <p>
        Hi there {props.firstName}, on this page you can manage your account.
      </p>
      <div>
        <p>We've got the following information from you:</p>
        <ol>
          <li>
            <span className="font-bold">Name:</span> {props.firstName}&nbsp;
            {props.lastName}
          </li>
          <li>
            <span className="font-bold">Email:</span> {props.email}
          </li>
        </ol>
      </div>
      <div>
        <h2 className="block w-full mt-10">Delete account</h2>
        <p>
          You can delete your account here. Deleted accounts are kept up to a
          week.
        </p>
      </div>
      <DeleteAccountField />
    </div>
  )
}

const mapStateToProps = (state) => ({
  firstName: state.account.user.firstName,
  lastName: state.account.user.lastName,
  email: state.account.user.email,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDelete: (email, password) => dispatch(fetchDelete(email, password)),
})

export const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageUI)
