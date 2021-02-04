import * as types from "./types";

const INITIAL_STATE = {
  loggedIn: false,
  redirect: false,
  token: localStorage.token ? localStorage.token : "",
  error: "",
  email: "",
  password: "", //TODO: check if that is secure?
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNED_IN:
      localStorage.token = action.payload;
      return {
        ...state,
        loggedIn: true,
        email: "",
        password: "",
        token: action.payload,
        error: "",
      };

    case types.SIGNED_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        redirect: true,
        token: "",
        error: "",
      };

    case types.VERIFIED:
      return { ...state, loggedIn: true, error: "" };

    case types.UNVERIFIED:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        token: "",
        error: action.payload,
      };

    case types.DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        redirect: true,
        token: "",
        error: "",
      };

    case types.REDIRECTED:
      return { ...state, redirect: false, error: "" };

    case types.ERROR:
      return { ...state, error: action.payload };

    case types.UPDATE_EMAIL:
      return { ...state, email: action.payload };

    case types.UPDATE_PASSWORD:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};

export default reducer;
