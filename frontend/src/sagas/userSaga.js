import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { userController } from "apiService";
import { ACTION_SAGA_TYPES, AuthActionType } from "./actionSagaTypes";
import { receiveUserListRedux } from "actions";

export function* workerUserListSaga(action) {
  const { params, configService } = action.payload;
  const userService = userController(configService);
  const res = yield call(userService.getUserList, params);
  yield put(receiveUserListRedux(res));
}

export function* watcherUserListSaga() {
  yield takeEvery(ACTION_SAGA_TYPES.API_USER_LIST_REQUEST, workerUserListSaga);
}

export function* localeEffect(action) {
  try {
    yield put({
      type: AuthActionType.SET_LOCALE_SUCCESS,
      payload: { locale: "en" },
    });
  } catch (error) {
    yield put({
      type: AuthActionType.SET_LOCALE_FAILED,
    });
  }
}

export function* localeSaga() {
  yield takeLatest(AuthActionType.SET_LOCALE_REQUEST, localeEffect);
}

// export function* loginEffect(action) {
//   try {
//     const { email, password, redirect } = action.payload;
//     const data = yield call(login, { email, password });

//     const payload = {
//       token: data.access_token,
//       threshold: data.threshold || 3600,
//       refreshToken: data.refresh_token,
//     };

//     yield put({ type: AuthActionType.LOGIN_SUCCESS, payload });
//     yield call(setItems, payload); // SET_LOCALSTORE

//   } catch (loginError) {
//     yield put({
//       type: NAME,
//       payload: {
//         NAME_ERROR,
//       },
//     });

//     yield call(SETINIT);
//   }
// }

// export function* loginSaga() {
//   yield takeLatest(AuthActionType.LOGIN_REQUEST, loginEffect);
// }
