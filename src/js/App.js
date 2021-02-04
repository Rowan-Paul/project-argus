import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { LandingPage } from "./landing-page/LandingPage";
import { NavBar } from "./common/navbar/NavBar";
import { Footer } from "./common/footer/Footer";

import { SignInPage } from "./account/SignInPage";
import { SignUpPage } from "./account/SignUpPage";

function AppUI() {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, []);

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

export const App = AppUI;
