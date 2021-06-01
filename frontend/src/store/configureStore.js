import createSagaMiddleware from "redux-saga";
import PropTypes from "prop-types";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "reducers";
import { rootSaga } from "sagas";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

export let store;

const AuthState = {
  token: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  threshold: PropTypes.number.isRequired,
  loginError: PropTypes.string.isRequired,
  logoutError: PropTypes.string.isRequired,
  signupError: PropTypes.string.isRequired,
  refreshToken: PropTypes.string.isRequired,
  passwordResetError: PropTypes.string.isRequired,
  x: PropTypes.any.isRequired,
};

export const RootStore = {
  auth: AuthState,
};

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

export const getCreateStore = () => {
  const historyMiddleware = routerMiddleware(history);
  const store = createStore(
    rootReducer(history),
    // applyMiddleware(logger)
    composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
