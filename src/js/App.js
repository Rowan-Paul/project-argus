import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { SignInPage } from './account/SignInPage'
import { SignUpPage } from './account/SignUpPage'
import { HomePage } from './homePage/HomePage'

import { NavBar } from './components/navBar/NavBar'
import { NotFound } from './components/NotFound'

import { fetchSignOut, fetchVerify } from './redux/account/actions'
import { AccountPage } from './account/AccountPage'
import { AboutPage } from './aboutPage/AboutPage'
import { Footer } from './components/Footer'
import { Dashboard } from './dashBoard/DashBoard'
import { NoticeModal } from './components/NoticeModal'
import { AdminPage } from './adminPage/AdminPage'
import { CardCheckOutPage } from './aboutPage/CardCheckOutPage'
import { DonationsPage } from './aboutPage/DonationsPage'
import { ContactPage } from './aboutPage/ContactPage'
import { IDealCheckOutPage } from './aboutPage/IDealCheckOutPage'
import { SuccesPage } from './aboutPage/SuccessPage'

require('dotenv').config()

function AppUI(props) {
  const promise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

  useEffect(() => {
    if (!props.loggedIn && props.token) {
      props.fetchVerify()
    }
  }, [props, props.loggedIn, props.token])

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      localStorage.theme !== 'light'
    ) {
      localStorage.theme = 'dark'
    }

    if (localStorage.theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
  })

  function signOut() {
    props.fetchSignOut()
    return null
  }

  if (props.verified) {
    return (
      <Router>
        <div className="flex flex-col min-h-screen justify-between">
          <div>
            <NavBar />
            <NoticeModal />
            <Elements stripe={promise}>
              <Switch>
                {/* LANDINGSPAGE */}
                <Route exact path="/">
                  {() => (props.loggedIn ? <Dashboard /> : <HomePage />)}
                </Route>

                {/* ABOUT */}
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/about/contact" component={ContactPage} />
                <Route exact path="/about/donate" component={DonationsPage} />

                {/* PAYMENT PROCESSING */}
                <Route exact path="/about/donate/checkout/card">
                  {props.payment.name ? (
                    <CardCheckOutPage />
                  ) : (
                    <Redirect to="/about/donate" />
                  )}
                </Route>
                <Route exact path="/about/donate/checkout/ideal">
                  {props.payment.name ? (
                    <IDealCheckOutPage />
                  ) : (
                    <Redirect to="/about/donate" />
                  )}
                </Route>
                <Route
                  exact
                  path="/about/donate/checkout"
                  component={SuccesPage}
                />

                {/* ACCOUNT - IF LOGGED OUT */}
                <Route exact path="/signin">
                  {() =>
                    props.loggedIn ? <Redirect to="/" /> : <SignInPage />
                  }
                </Route>
                <Route exact path="/signup">
                  {() =>
                    props.loggedIn ? <Redirect to="/" /> : <SignUpPage />
                  }
                </Route>

                {/* ACCOUNT - IF LOGGED IN */}
                <Route exact path="/signout">
                  {() => (props.loggedIn ? signOut() : <Redirect to="/" />)}
                </Route>
                <Route exact path="/account">
                  {() =>
                    props.loggedIn ? <AccountPage /> : <Redirect to="/signin" />
                  }
                </Route>
                <Route exact path="/account/admin">
                  {() =>
                    props.isAdmin ? <AdminPage /> : <Redirect to="/account" />
                  }
                </Route>

                {/* MISCELLANEOUS */}
                <Route component={NotFound} />
              </Switch>
            </Elements>
          </div>
          <Footer className="" />
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div className="flex flex-col min-h-screen justify-between">
          <div>
            <NavBar />
            <NoticeModal />

            <Elements stripe={promise}>
              <Switch>
                {/* LANDINGSPAGE */}
                <Route exact path="/">
                  {() => (props.loggedIn ? <Dashboard /> : <HomePage />)}
                </Route>

                {/* ABOUT */}
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/about/contact" component={ContactPage} />
                <Route exact path="/about/donate" component={DonationsPage} />

                {/* PAYMENT PROCESSING */}
                <Route exact path="/about/donate/checkout/card">
                  {props.payment.name ? (
                    <CardCheckOutPage />
                  ) : (
                    <Redirect to="/about/donate" />
                  )}
                </Route>
                <Route exact path="/about/donate/checkout/ideal">
                  {props.payment.name ? (
                    <IDealCheckOutPage />
                  ) : (
                    <Redirect to="/about/donate" />
                  )}
                </Route>
                <Route
                  exact
                  path="/about/donate/checkout"
                  component={SuccesPage}
                />

                {/* ACCOUNT - IF LOGGED OUT */}
                <Route exact path="/signin">
                  {() =>
                    props.loggedIn ? <Redirect to="/" /> : <SignInPage />
                  }
                </Route>
                <Route exact path="/signup">
                  {() =>
                    props.loggedIn ? <Redirect to="/" /> : <SignUpPage />
                  }
                </Route>
              </Switch>
            </Elements>
          </div>
          <Footer className="" />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  isAdmin: state.account.user.isAdmin,
  token: state.account.token,
  notice: state.main.notice,
  verified: state.account.verified,
  payment: state.main.payment,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSignOut: () => dispatch(fetchSignOut()),
  fetchVerify: () => dispatch(fetchVerify()),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppUI)
