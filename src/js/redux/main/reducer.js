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
  payment: {
    amount: null,
    currency: null,
    name: null,
  },
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BACKDROP_SET:
      return { ...state, backdrop: action.payload }

    case types.NOTICE:
      return { ...state, notice: action.payload }

    case types.AMOUNT_SET:
      return {
        ...state,
        payment: {
          amount: action.payload,
          currency: state.payment.currency,
          name: state.payment.name,
        },
      }

    case types.CURRENCY_SET:
      return {
        ...state,
        payment: {
          amount: state.payment.amount,
          currency: action.payload,
          name: state.payment.name,
        },
      }

    case types.NAME_SET:
      return {
        ...state,
        payment: {
          amount: state.payment.amount,
          currency: state.payment.currency,
          name: action.payload,
        },
      }

    default:
      return state
  }
}

export const mainReducer = reducer
