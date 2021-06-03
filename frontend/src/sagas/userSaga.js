import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { userController } from "apiService";
import { ACTION_SAGA_TYPES, AuthActionType } from "./actionSagaTypes";
import { receiveUserListRedux } from "actions";
import { handleItem } from "../helpers/functions";

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

// eslint-disable-next-line require-yield
export function* loginEffect(action) {
  try {
    console.log(action.data.redirect);
    const { redirect } = action.data;
    if (action.data.login) {
      yield call(handleItem, "access-token", action.data.login); // SET_LOCALSTORE
      redirect();
    }
  } catch (loginError) {
    console.log(loginError);
  }
}

export function* loginSaga() {
  yield takeLatest("SET_TOKEN", loginEffect);
}
