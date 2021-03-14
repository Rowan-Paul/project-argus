import * as types from './types'

const INITIAL_STATE = {
  payment: {
    amount: null,
    currency: null,
    name: null,
  },
  donations: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    case types.FETCHED_DONATIONS:
      return { ...state, donations: action.payload }

    default:
      return state
  }
}

export const donationsReducer = reducer
