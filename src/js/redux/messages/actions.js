import * as types from './types'

import { setNotice } from '../main/actions'

let api = '/api/v1'

// add user as admin
export const sendMessage = (message) => (dispatch) => {
  const url = `${api}/messages`

  fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: types.SENT_MESSAGE })
        dispatch(setNotice({ message: 'Message sent', type: 'success' }))
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to send message:', statusText)

      dispatch(
        setNotice({
          message: 'Failed to send message',
          type: 'error',
        })
      )
    })
}

// fetch messages
export const fetchMessages = () => (dispatch, getState) => {
  const url = `${api}/messages`
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
    .then((messages) => {
      dispatch({ type: types.FETCHED_MESSAGES, payload: messages })
    })
    .catch((statusText) => {
      console.log('Failed to get messages:', statusText)

      dispatch(
        setNotice({
          message: 'Failed to get messages',
          type: 'error',
        })
      )
    })
}

// remove message
export const deleteMessage = (message) => (dispatch, getState) => {
  const url = `${api}/messages/${message}`
  const bearer = 'Bearer ' + getState().account.token

  fetch(url, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      authorization: bearer,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.DELETED_MESSAGE })
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to delete message:', statusText)

      dispatch(
        setNotice({
          message: 'Failed to delete message',
          type: 'error',
        })
      )
    })
}
