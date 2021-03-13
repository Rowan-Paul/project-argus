import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignOutIcon } from './components/SignOutIcon'
import { NightModeIcon } from './components/NightModeIcon'
import { clearActiveMovies } from '../../redux/movies/actions'

function NavBarUI(props) {
  return (
    <nav>
      <ul className="text-white bg-black bg-opacity-75 list-none overflow-hidden absolute min-w-full">
        <li className="float-left">
          <Link
            to="/"
            className="block text-center p-4 no-underline"
            onClick={() => props.clearActiveMovies()}
          >
            project-argus
          </Link>
        </li>

        {<NightModeIcon />}
        {props.loggedIn ? <SignOutIcon /> : ''}

        <li className="float-right">
          <Link
            to={props.loggedIn ? '/account' : '/signin'}
            className="block text-center p-4 no-underline"
            onClick={() => props.clearActiveMovies()}
          >
            {props.loggedIn ? props.firstName : 'Sign In'}
          </Link>
        </li>

        {/* TODO: make a new thing for mobile */}
        <li className="float-right">
          <Link
            to="/about"
            className="block text-center p-4 no-underline"
            onClick={() => props.clearActiveMovies()}
          >
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

const mapDispatchToProps = (dispatch) => ({
  clearActiveMovies: () => dispatch(clearActiveMovies()),
})

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI)
