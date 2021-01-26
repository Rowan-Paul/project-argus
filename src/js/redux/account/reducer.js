import * as types from "./types";

const INITIAL_STATE = {
  redirect: false,
  token: localStorage.token ? localStorage.token : "",
  error: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REGISTERED:
      return { ...state, redirect: true };

    case types.SIGNED_IN:
      localStorage.token = action.payload;
      return { ...state, redirect: true, token: action.payload };

    case types.SIGNED_OUT:
      localStorage.removeItem("token");
      return { ...state, redirect: true, token: "" };

    case types.REDIRECTED:
      return { ...state, redirect: false };

    case types.ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
