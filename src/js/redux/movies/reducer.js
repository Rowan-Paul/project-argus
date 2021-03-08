import * as types from './types'

const INITIAL_STATE = {
  activeMovies: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.WATCHED:
      return {
        // Again copy the entire state object
        ...state,
        // This time, we need to make a copy of the old array
        activeMovies: state.activeMovies.map((movie) => {
          // If this isn't the item we're looking for, leave it alone
          if (movie._id !== action.payload) {
            return movie
          }

          // We've found the item that has to change. Return a copy:
          return {
            ...movie,
            // Flip the isWatched flag
            isWatched: true,
          }
        }),
      }

    case types.FETCHED_MOVIES:
      return { ...state, activeMovies: action.payload }

    default:
      return state
  }
}

export const movieReducer = reducer
