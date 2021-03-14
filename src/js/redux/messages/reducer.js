import * as types from './types'

const INITIAL_STATE = {
  messages: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SENT_MESSAGE:
      return { ...state }

    case types.FETCHED_MESSAGES:
      return { ...state, messages: action.payload }

    case types.DELETED_MESSAGE:
      return { ...state, messages: [] }

    default:
      return state
  }
}

export const messagesReducer = reducer
