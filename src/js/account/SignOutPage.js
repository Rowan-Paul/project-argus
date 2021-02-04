import { useEffect } from "react";
import { connect } from "react-redux";

import { fetchSignOut } from "../redux/account/actions";

function SignOutPageUI(props) {
  useEffect(() => {
    if (props.redirect) {
      props.history.push("/");
    } else {
      props.fetchSignOut();
    }
  });

  return "";
}

const mapStateToProps = (state) => ({
  redirect: state.account.redirect,
  error: state.account.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSignOut: () => dispatch(fetchSignOut()),
});

export const SignOutPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutPageUI);
