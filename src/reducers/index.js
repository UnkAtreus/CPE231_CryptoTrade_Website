import {
  combineReducers,
} from 'redux'
import {
  routeHistoryRedux,
} from './routeReducers'
import {
  userReduxList,
  userAuthRedux,
} from './userReducers'

export const rootReducer = () => {
  return combineReducers({
    routeHistoryRedux,
    userReduxList,
    userAuthRedux,
  })
}