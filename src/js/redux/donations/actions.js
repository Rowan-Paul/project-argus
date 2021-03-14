import * as types from './types'
import { setNotice } from '../main/actions'

let api = 'http://localhost:3000/api/v1'
if (process.env.NODE_ENV === 'production') {
  api = 'https://api.projectarg.us/api/v1'
}

export const setAmount = (amount) => {
  return { type: types.AMOUNT_SET, payload: amount }
}

export const setCurrency = (currency) => {
  return { type: types.CURRENCY_SET, payload: currency }
}

export const setName = (name) => {
  return { type: types.NAME_SET, payload: name }
}

export const setEmail = (email) => {
  return { type: types.EMAIL_SET, payload: email }
}

// fetch donations
export const fetchDonations = () => (dispatch, getState) => {
  const url = `${api}/donations`
  const bearer = 'Bearer ' + getState().account.token

  fetch(url, {
    method: 'GET',
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
    .then((donations) =>
      dispatch({ type: types.FETCHED_DONATIONS, payload: donations })
    )
    .catch((statusText) => {
      console.log("Can't get donations:", statusText)

      dispatch(setNotice({ message: "Can't get donations", type: 'error' }))
    })
}
