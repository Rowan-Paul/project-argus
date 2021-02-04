import * as types from "./types";

const INITIAL_STATE = {
  loggedIn: false,
  redirect: false,
  token: localStorage.token ? localStorage.token : "",
  error: "",
  email: "",
  password: "", //TODO: check if that is secure?
  pages: [
    {
      name: "Home",
      address: "/",
    },
    {
      name: "About",
      address: "/about",
    },
    {
      name: "Sign In",
      address: "/signin",
    },
  ],
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
        pages: [
          {
            name: "Home",
            address: "/",
          },
          {
            name: "About",
            address: "/about",
          },
          {
            name: "Account",
            address: "/account",
          },
          {
            name: "Sign out",
            address: "/signout",
          },
        ],
      };

    case types.SIGNED_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        redirect: true,
        token: "",
        error: "",
        pages: [
          {
            name: "Home",
            address: "/",
          },
          {
            name: "About",
            address: "/about",
          },
          {
            name: "Sign In",
            address: "/signin",
          },
        ],
      };

    case types.VERIFIED:
      return {
        ...state,
        loggedIn: true,
        error: "",
        pages: [
          {
            name: "Home",
            address: "/",
          },
          {
            name: "About",
            address: "/about",
          },
          {
            name: "Account",
            address: "/account",
          },
          {
            name: "Sign Out",
            address: "/signout",
          },
        ],
      };

    case types.UNVERIFIED:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        token: "",
        error: action.payload,
        pages: [
          {
            name: "Home",
            address: "/",
          },
          {
            name: "About",
            address: "/about",
          },
          {
            name: "Sign In",
            address: "/signin",
          },
        ],
      };

    case types.DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        redirect: true,
        token: "",
        error: "",
        pages: [
          {
            name: "Home",
            address: "/",
          },
          {
            name: "About",
            address: "/about",
          },
          {
            name: "Sign In",
            address: "/signin",
          },
        ],
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
