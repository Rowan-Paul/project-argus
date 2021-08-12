import { combineReducers } from 'redux'

import { mainReducer } from './main/reducer'
import { accountReducer } from './account/reducer'
import { movieReducer } from './movies/reducer'
import { messagesReducer } from './messages/reducer'
import { donationsReducer } from './donations/reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  account: accountReducer,
  movies: movieReducer,
  messages: messagesReducer,
  donations: donationsReducer,
})

export default rootReducer
