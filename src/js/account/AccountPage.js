import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchDelete,
  updateEmail,
  updatePassword,
  setError,
} from "../redux/account/actions";

function AccountPageUI(props) {
  useEffect(() => {
    if (!props.loggedIn) {
      props.history.push("/");
    }
  });

  const signinClicked = async () => {
    if (document.getElementById("delete").checkValidity()) {
      props.fetchDelete();
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
      <form id="delete" className="mt-8 max-w-md" onKeyDown={keyDownEvent}>
        <h1>Account</h1>
        <p>
          Welcome to your account page. On this page you can delete your
          account, with more coming soon.
        </p>

        <h2>Delete account</h2>
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
          Delete
        </div>
        <p className="mt-5 mb-5 text-red-500">
          {props.error ? "Error: " + props.error : ""}
        </p>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  redirect: state.account.redirect,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDelete: () => dispatch(fetchDelete()),
  updateEmail: (email) => dispatch(updateEmail(email)),
  updatePassword: (password) => dispatch(updatePassword(password)),
  setError: (error) => dispatch(setError(error)),
});

export const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPageUI);
