import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignOutIcon } from './components/SignOutIcon'
import { NightModeIcon } from './components/NightModeIcon'

function NavBarUI(props) {
  return (
    <nav>
      <ul className="text-white bg-black bg-opacity-75 list-none overflow-hidden absolute min-w-full">
        <li className="float-left">
          <Link to="/" className="block text-center p-4 no-underline">
            project-argus
          </Link>
        </li>
        {<NightModeIcon />}
        {props.loggedIn ? <SignOutIcon /> : ''}
        <li className="float-right">
          <Link
            to={props.loggedIn ? '/account/' : '/signin'}
            className="block text-center p-4 no-underline"
          >
            {props.loggedIn ? props.firstName : 'Sign In'}
          </Link>
        </li>
        <li className="float-right hidden lg:block">
          <Link to="/about" className="block text-center p-4 no-underline">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  firstName: state.account.user.firstName,
})

export const NavBar = connect(mapStateToProps, null)(NavBarUI)
