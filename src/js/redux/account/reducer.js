import * as types from './types'

const INITIAL_STATE = {
  token: localStorage.token ? localStorage.token : '',
  loggedIn: false,
  user: {},
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNED_IN:
      localStorage.token = action.payload.token
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
        user: action.payload.user,
      }

    case types.SIGNED_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: '',
        loggedIn: false,
        user: {},
      }

    case types.VERIFIED:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      }

    case types.DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: '',
        loggedIn: false,
        user: {},
      }

    default:
      return state
  }
}

export const accountReducer = reducer
