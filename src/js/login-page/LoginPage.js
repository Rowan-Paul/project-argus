import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchSignUp,
  fetchSignIn,
  fetchSignOut,
  redirected,
} from "../redux/account/actions";

function LoginPageUI(props) {
  useEffect(() => {
    if (props.redirect) {
      props.redirected();
      props.history.push("/");
    }
  });

  const signupClicked = () => {
    props.fetchSignUp("rp-flynn@outlook.com", "password");
  };

  const signinClicked = async () => {
    props.fetchSignIn("rp-flynn@outlook.com", "password");
  };

  const logoutClicked = async () => {
    props.fetchSignOut(props.token);
  };

  return (
    <React.Fragment>
      <p>{props.error ? "Error: " + props.error : ""}</p>
      <button onClick={signupClicked}>Signup</button>
      <button onClick={signinClicked}>Sign in</button>
      <button onClick={logoutClicked}>Logout</button>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  redirect: state.account.redirect,
  token: state.account.token,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSignUp: (email, password) => dispatch(fetchSignUp(email, password)),
  fetchSignIn: (email, password) => dispatch(fetchSignIn(email, password)),
  fetchSignOut: (token) => dispatch(fetchSignOut(token)),
  redirected: () => dispatch(redirected()),
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageUI);
