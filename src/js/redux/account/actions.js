import * as types from "./types";

// register user
export const fetchSignUp = (email, password) => (dispatch) => {
  const url = "http://localhost:3000/api/account/signup";
  const data = {
    email: email,
    password: password,
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
        dispatch(fetchSignIn(email, password));
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
export const fetchSignIn = (email, password) => (dispatch) => {
  const url = "http://localhost:3000/api/account/signin";
  const data = {
    email: email,
    password: password,
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
  const url = "http://localhost:3000/api/account/signout";
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
  const url = "http://localhost:3000/api/account/verify";
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
  const url = "http://localhost:3000/api/account/delete";
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

export const redirected = () => {
  return { type: types.REDIRECTED };
};
