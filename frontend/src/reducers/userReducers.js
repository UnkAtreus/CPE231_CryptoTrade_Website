import {
  ACTION_TYPES,
} from 'actions'
import {
  ACTION_SAGA_TYPES,
} from 'sagas'

const initialUserListState = {
  data: []
}

export const userReduxList = (state = initialUserListState, action) => {
  switch(action.type) {
    case ACTION_SAGA_TYPES.API_USER_LIST_RESPONSE:
      return action.payload
    default:
      return state
  }
}

const initialUserAuthState = {}

export const userAuthRedux = (state = initialUserAuthState, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_USER_AUTH:
      return action.payload
    default:
      return state
  }
}