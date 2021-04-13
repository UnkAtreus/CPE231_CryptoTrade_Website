import {
  ACTION_TYPES,
} from './actionTypes'
import {
  ACTION_SAGA_TYPES,
} from 'sagas'

export const callUserListRedux = (payload) => ({
  type: ACTION_SAGA_TYPES.API_USER_LIST_REQUEST,
  payload,
})

export const receiveUserListRedux = (payload) => ({
  type: ACTION_SAGA_TYPES.API_USER_LIST_RESPONSE,
  payload,
})

export const setUserAuthRedux = (payload) => ({
  type: ACTION_TYPES.SET_USER_AUTH,
  payload,
})