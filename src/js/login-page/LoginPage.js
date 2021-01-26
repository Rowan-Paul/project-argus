import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchSignUp,
  fetchSignIn,
  fetchSignOut,
  redirected,
  fetchVerify,
  fetchDelete,
} from "../redux/account/actions";

function LoginPageUI(props) {
  useEffect(() => {
    if (props.redirect) {
      props.redirected();
      props.history.push("/");
    } else if (props.loggedIn) {
      console.log("logged in");
      //   props.history.push("/account");
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

  const verifyClicked = async () => {
    props.fetchVerify(props.token);
  };

  const deleteClicked = async () => {
    props.fetchDelete("rp-flynn@outlook.com", "password");
  };

  return (
    <React.Fragment>
      <p>{props.error ? "Error: " + props.error : ""}</p>
      <button onClick={signupClicked}>Signup</button>
      <button onClick={signinClicked}>Sign in</button>
      <button onClick={logoutClicked}>Logout</button>
      <button onClick={verifyClicked}>Verify</button>
      <button onClick={deleteClicked}>Delete</button>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  redirect: state.account.redirect,
  token: state.account.token,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSignUp: (email, password) => dispatch(fetchSignUp(email, password)),
  fetchSignIn: (email, password) => dispatch(fetchSignIn(email, password)),
  fetchSignOut: (token) => dispatch(fetchSignOut(token)),
  fetchVerify: (token) => dispatch(fetchVerify(token)),
  fetchDelete: (email, password) => dispatch(fetchDelete(email, password)),
  redirected: () => dispatch(redirected()),
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageUI);
