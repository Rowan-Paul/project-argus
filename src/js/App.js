import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { LandingPage } from "./landing-page/LandingPage";
import { NavBar } from "./common/navbar/NavBar";
import { Footer } from "./common/footer/Footer";

import { SignInPage } from "./account/SignInPage";
import { SignUpPage } from "./account/SignUpPage";
import { SignOutPage } from "./account/SignOutPage";
import { AccountPage } from "./account/AccountPage";

import { NotFound } from "./common/NotFound";

import { fetchVerify } from "./redux/account/actions";

function AppUI(props) {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      localStorage.theme !== "light"
    ) {
      localStorage.theme = "dark";
    }

    if (localStorage.theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }

    if (!props.loggedIn && props.token) {
      props.fetchVerify();
    }
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen justify-between">
        <NavBar className="h-10" />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/signout" component={SignOutPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route component={NotFound} />
        </Switch>
        <Footer className="h-10" />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  token: state.account.token,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVerify: () => dispatch(fetchVerify()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);
