import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchSignIn,
  updateEmail,
  updatePassword,
  setError,
} from "../redux/account/actions";

function SignInPageUI(props) {
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
    if (props.error) props.setError("");
    if (e.keyCode === 13) {
      e.preventDefault();
      signinClicked();
    }
  };

  return (
    <div className="flex justify-center">
      <form id="signIn" className="mt-8 max-w-md" onKeyDown={keyDownEvent}>
        <h1 className="text-lg mb-5">Sign in</h1>
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
        <p className="mt-5 mb-5 text-red-500">
          {props.error ? "Error: " + props.error : ""}
        </p>
        <p>
          No account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSignIn: () => dispatch(fetchSignIn()),
  updateEmail: (email) => dispatch(updateEmail(email)),
  updatePassword: (password) => dispatch(updatePassword(password)),
  setError: (error) => dispatch(setError(error)),
});

export const SignInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPageUI);
