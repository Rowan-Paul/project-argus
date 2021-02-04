import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { LandingPage } from "./landing-page/LandingPage";
import { NavBar } from "./common/navbar/NavBar";
import { Footer } from "./common/footer/Footer";

import { SignInPage } from "./account/SignInPage";
import { SignUpPage } from "./account/SignUpPage";
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

    if (!props.loggedIn && localStorage.token) {
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
        </Switch>
        <Footer className="h-10" />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchVerify: () => dispatch(fetchVerify()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);
