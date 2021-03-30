import createSagaMiddleware from 'redux-saga'
import { 
  createStore,
  applyMiddleware,
} from 'redux'
import {
  rootReducer,
} from 'reducers'
import {
  rootSaga
} from 'sagas'

export let store

export const getCreateStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  store = createStore(
    rootReducer(),
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}