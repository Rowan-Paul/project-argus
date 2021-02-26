import { combineReducers } from 'redux'

import { mainReducer } from './main/reducer'
import { accountReducer } from './account/reducer'

const rootReducer = combineReducers({
  main: mainReducer,
  account: accountReducer,
})

export default rootReducer
