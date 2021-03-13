import * as types from './types'

const INITIAL_STATE = {
  backdrop: {
    imgUrl: null,
    imgName: null,
  },
  notice: {
    message: null,
    type: null,
  },
  amount: null,
  currency: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BACKDROP_SET:
      return { ...state, backdrop: action.payload }

    case types.NOTICE:
      return { ...state, notice: action.payload }

    case types.AMOUNT_SET:
      return { ...state, amount: action.payload }

    case types.CURRENCY_SET:
      return { ...state, currency: action.payload }

    default:
      return state
  }
}

export const mainReducer = reducer
