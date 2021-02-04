import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchSignUp,
  updateEmail,
  updatePassword,
  setError,
} from "../redux/account/actions";

function SignUpPageUI(props) {
  useEffect(() => {
    if (props.loggedIn) {
      props.history.push("/account");
    }
  });

  const signUpClicked = async () => {
    if (document.getElementById("signup").checkValidity()) {
      props.fetchSignUp();
    } else {
      props.setError("The form is not complete");
    }
  };

  const keyDownEvent = (e) => {
    if (props.error) props.setError("");
    if (e.keyCode === 13) {
      e.preventDefault();
      signUpClicked();
    }
  };

  return (
    <div className="flex justify-center">
      <form id="signup" className="mt-8 max-w-md" onKeyDown={keyDownEvent}>
        <h1 className="text-lg mb-5">Sign up</h1>
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
        <div className="block">
          <div className="mt-2">
            <div>
              <label className="inline-flex items-center">
                <input type="checkbox" required />
                <span className="ml-2">I agree</span>
              </label>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer mt-5 ml-3"
          onClick={(e) => {
            signUpClicked();
          }}
        >
          Login
        </div>
        <p className="mt-5 mb-5 text-red-500">
          {props.error ? "Error: " + props.error : ""}
        </p>
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
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
  fetchSignUp: () => dispatch(fetchSignUp()),
  updateEmail: (email) => dispatch(updateEmail(email)),
  updatePassword: (password) => dispatch(updatePassword(password)),
  setError: (error) => dispatch(setError(error)),
});

export const SignUpPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPageUI);
