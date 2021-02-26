import { combineReducers } from 'redux'

import { mainReducer } from './main/reducer'
import { accountReducer } from './account/reducer'
import { movieReducer } from './movies/reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  account: accountReducer,
  movies: movieReducer,
})

export default rootReducer
