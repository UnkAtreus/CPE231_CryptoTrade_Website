import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects'
import {
  userController,
} from 'apiService'
import {
  ACTION_SAGA_TYPES,
} from './actionSagaTypes'
import {
  receiveUserListRedux,
} from 'actions'

export function* workerUserListSaga(action) {
  const {
    params,
    configService
  } = action.payload
  const userService = userController(configService)
  const res = yield call(userService.getUserList, params)
  yield put(receiveUserListRedux(res))
}

export function* watcherUserListSaga() {
  yield takeEvery(ACTION_SAGA_TYPES.API_USER_LIST_REQUEST, workerUserListSaga)
}