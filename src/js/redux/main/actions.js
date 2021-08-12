import * as types from './types'

let api = '/api/v1'

// fetch backdrops
export const fetchBackdrop = () => (dispatch) => {
  const url = `${api}/movies/popular`

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
    .then((movies) => dispatch(setBackdrop(movies)))
    .catch((statusText) => {
      console.log("Can't get movies:", statusText)

      dispatch({
        type: types.BACKDROP_SET,
        payload: {
          imgUrl: 'https://via.placeholder.com/780x439?text=No+Backdrop+Found',
          imgName: 'Something went horribly wrong...',
        },
      })
    })
}

// set the backdrop
export const setBackdrop = (movies) => (dispatch) => {
  function getResponsiveImage() {
    if (
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) < 768
    ) {
      return 'w780'
    } else {
      return 'original'
    }
  }

  const randomImage = movies[Math.floor(Math.random() * movies.length)]

  dispatch({
    type: types.BACKDROP_SET,
    payload: {
      imgUrl: `https://www.themoviedb.org/t/p/${getResponsiveImage()}/${
        randomImage.backdropPath
      }`,
      imgName: randomImage.title,
    },
  })
}

export const updateBackdrop = () => (dispatch, getState) => {
  const url = `${api}/movies/popular`
  const bearer = 'Bearer ' + getState().account.token

  fetch(url, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { authorization: bearer },
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({ type: types.UPDATED_BACKDROP })
        dispatch(setNotice({ message: 'Updated backdrops', type: 'success' }))
        dispatch(fetchBackdrop())
      } else {
        throw response.statusText
      }
    })
    .catch((statusText) => {
      console.log('Failed to update backdrops', statusText)

      dispatch(
        setNotice({ message: 'Failed to update backdrops', type: 'error' })
      )
    })
}

// set notice
export const setNotice = (notice) => {
  return { type: types.NOTICE, payload: notice }
}
