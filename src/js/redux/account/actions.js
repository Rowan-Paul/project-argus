import * as types from "./types";

let api = "http://localhost:3000/";
if (process.env.NODE_ENV === "production") {
  api = "https://api.projectarg.us/api";
}

// register user
export const fetchSignUp = () => (dispatch, getState) => {
  const url = `${api}account/signup`;
  const data = {
    email: getState().account.email,
    password: getState().account.password,
  };

  fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch(fetchSignIn());
      } else {
        throw response.statusText;
      }
    })
    .catch((statusText) => {
      dispatch({
        type: types.ERROR,
        payload: statusText,
      });
    });
};

// sign in user
export const fetchSignIn = () => (dispatch, getState) => {
  const url = `${api}account/signin`;
  const data = {
    email: getState().account.email,
    password: getState().account.password,
  };

  fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw response.statusText;
      }
    })
    .then((response) => {
      dispatch({
        type: types.SIGNED_IN,
        payload: response.token,
      });
    })
    .catch((statusText) => {
      dispatch({
        type: types.ERROR,
        payload: statusText,
      });
    });
};

// sign out user
export const fetchSignOut = (token) => (dispatch) => {
  const url = `${api}account/signout`;
  const data = {
    token: token,
  };

  fetch(url, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.SIGNED_OUT,
          payload: response.token,
        });
      } else {
        throw response.statusText;
      }
    })
    .catch((statusText) => {
      dispatch({
        type: types.ERROR,
        payload: statusText,
      });
    });
};

// verify user
export const fetchVerify = (token) => (dispatch) => {
  const url = `${api}account/verify`;
  const data = {
    token: token,
  };

  fetch(url, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.VERIFIED,
          payload: response.token,
        });
      } else {
        throw response.statusText;
      }
    })
    .catch((statusText) => {
      dispatch({
        type: types.UNVERIFIED,
        payload: statusText,
      });
    });
};

// delete user
export const fetchDelete = (email, password) => (dispatch) => {
  const url = `${api}account/delete`;
  const data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.DELETED,
        });
      } else {
        throw response.statusText;
      }
    })
    .catch((statusText) => {
      dispatch({
        type: types.ERROR,
        payload: statusText,
      });
    });
};

// set redirect to false
export const redirected = () => {
  return { type: types.REDIRECTED };
};

// set email
export const updateEmail = (email) => {
  return { type: types.UPDATE_EMAIL, payload: email };
};

// set password
export const updatePassword = (password) => {
  return { type: types.UPDATE_PASSWORD, payload: password };
};

// set error
export const setError = (error) => {
  return { type: types.ERROR, payload: error };
};
