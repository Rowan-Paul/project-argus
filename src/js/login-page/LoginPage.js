import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchSignUp,
  fetchSignIn,
  fetchSignOut,
  redirected,
  fetchVerify,
  fetchDelete,
  updateEmail,
  updatePassword,
  setError,
} from "../redux/account/actions";

function LoginPageUI(props) {
  useEffect(() => {
    if (props.loggedIn) {
      props.history.push("/account");
    }
  });

  const signinClicked = async () => {
    if (document.getElementById("signIn").checkValidity()) {
      props.fetchSignIn();
    } else {
      props.setError("Fill in both your email and username");
    }
  };

  const keyDownEvent = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      signinClicked();
    }
  };

  //   const signupClicked = () => {
  //     props.fetchSignUp("rp-flynn@outlook.com", "password");
  //   };

  //   const logoutClicked = async () => {
  //     props.fetchSignOut(props.token);
  //   };

  //   const verifyClicked = async () => {
  //     props.fetchVerify(props.token);
  //   };

  //   const deleteClicked = async () => {
  //     props.fetchDelete("rp-flynn@outlook.com", "password");
  //   };

  return (
    <div className="flex justify-center">
      <form id="signIn" className="mt-8 max-w-md" onKeyDown={keyDownEvent}>
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="dark:text-primary-dark text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              className="text-gray-700 mt-1 block w-full"
              placeholder="john@example.com"
              required
              onChange={(e) => {
                props.updateEmail(e.target.value);
              }}
            />
          </label>
          <label className="block">
            <span className="dark:text-primary-dark text-gray-700">
              Password
            </span>
            <input
              type="password"
              id="password"
              className="text-gray-700 mt-1 block w-full"
              required
              onChange={(e) => {
                props.updatePassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div
          className="cursor-pointer mt-5 ml-3"
          onClick={(e) => {
            signinClicked();
          }}
        >
          Login
        </div>
        <p>{props.error ? "Error: " + props.error : ""}</p>
      </form>
    </div>
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
  fetchSignIn: () => dispatch(fetchSignIn()),
  fetchSignOut: (token) => dispatch(fetchSignOut(token)),
  fetchVerify: (token) => dispatch(fetchVerify(token)),
  fetchDelete: (email, password) => dispatch(fetchDelete(email, password)),
  redirected: () => dispatch(redirected()),
  updateEmail: (email) => dispatch(updateEmail(email)),
  updatePassword: (password) => dispatch(updatePassword(password)),
  setError: (error) => dispatch(setError(error)),
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageUI);
