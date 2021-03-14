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
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BACKDROP_SET:
      return { ...state, backdrop: action.payload }

    case types.NOTICE:
      return { ...state, notice: action.payload }

    case types.UPDATED_BACKDROP:
      return { ...state }

    default:
      return state
  }
}

export const mainReducer = reducer
