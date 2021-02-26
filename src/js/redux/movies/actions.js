import { setNotice } from '../main/actions'
import * as types from './types'

let api = 'http://localhost:3000/api/v1'
if (process.env.NODE_ENV === 'production') {
  api = 'https://api.projectarg.us/api/v1'
}

// mark movie as watched
export const markAsWatched = (movie) => (dispatch) => {
  const url = `${api}/movies/${movie}/watched`
  const data = {
    date: Date.now(),
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
        dispatch({ type: types.WATCHED, payload: movie })
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to mark as watched:', statusText)

      dispatch(
        setNotice({ message: 'Failed to mark as watched', type: 'error' })
      )
    })
}

// search movie
export const searchMovie = (movie) => (dispatch) => {
  const url = `${api}/movies/${movie}`

  fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw response.statusText
      }
    })
    .then((movies) => {
      dispatch({ type: types.FETCHED_MOVIES, payload: movies })
    })
    .catch((statusText) => {
      console.log('Failed get movie:', statusText)

      dispatch(setNotice({ message: 'Failed to find movie', type: 'error' }))
    })
}
