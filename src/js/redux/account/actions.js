import { setNotice } from '../main/actions'
import * as types from './types'

let api = 'http://localhost:3000/api/v1'
if (process.env.NODE_ENV === 'production') {
  api = 'https://api.projectarg.us/api/v1'
}

// register user
export const fetchSignUp = (firstName, lastName, email, password) => (
  dispatch
) => {
  const url = `${api}/account/signup`
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  }

  fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch(fetchSignIn(email, password))
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to register:', statusText)

      dispatch(setNotice({ message: 'Failed to sign up', type: 'error' }))
    })
}

// sign in user
export const fetchSignIn = (email, password) => (dispatch) => {
  const url = `${api}/account/signin`
  const data = {
    email: email,
    password: password,
  }

  fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((response) => {
      dispatch({
        type: types.SIGNED_IN,
        payload: { token: response.token, user: response.user },
      })
    })
    .catch((statusText) => {
      console.log('Failed to login:', statusText)

      dispatch(setNotice({ message: 'Failed to sign in', type: 'error' }))
    })
}

// sign out user
export const fetchSignOut = () => (dispatch, getState) => {
  const url = `${api}/account/signout`
  const data = {
    token: getState().account.token,
  }

  fetch(url, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.SIGNED_OUT,
        })
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to sign out:', statusText)

      dispatch(setNotice({ message: 'Failed to sign out', type: 'error' }))
    })
}

// verify user
export const fetchVerify = () => (dispatch, getState) => {
  const url = `${api}/account/verify`
  const bearer = 'Bearer ' + getState().account.token

  fetch(url, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      authorization: bearer,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((response) => {
      dispatch({
        type: types.VERIFIED,
        payload: response,
      })
    })
    .catch((statusText) => {
      dispatch({
        type: types.SIGNED_OUT,
        payload: statusText,
      })
    })
}

// delete user
export const fetchDelete = (email, password) => (dispatch) => {
  const url = `${api}/account`
  const data = {
    email: email,
    password: password,
  }

  fetch(url, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.DELETED,
        })
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to delete account:', statusText)

      dispatch(
        setNotice({ message: 'Failed to delete account', type: 'error' })
      )
    })
}

// add user as admin
export const fetchAddAdmin = (newAdmin) => (dispatch, getState) => {
  const url = `${api}/account/admin`
  const bearer = 'Bearer ' + getState().account.token
  const data = {
    newAdmin: newAdmin,
  }

  fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      authorization: bearer,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: types.ADDED_ADMIN })
        dispatch(
          setNotice({ message: 'Gave permissions to user', type: 'success' })
        )
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to give permission to user:', statusText)

      dispatch(
        setNotice({
          message: 'Failed to give permissions to user',
          type: 'error',
        })
      )
    })
}
