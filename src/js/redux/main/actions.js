import * as types from './types'

let api = 'http://localhost:3000/api/v1'
if (process.env.NODE_ENV === 'production') {
  api = 'https://api.projectarg.us/api/v1'
}

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

// set notice
export const setNotice = (notice) => {
  return { type: types.NOTICE, payload: notice }
}

export const setAmount = (amount) => {
  return { type: types.AMOUNT_SET, payload: amount }
}

export const setCurrency = (currency) => {
  return { type: types.CURRENCY_SET, payload: currency }
}
