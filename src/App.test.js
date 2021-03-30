import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  put,
  takeEvery,
  call,
} from 'redux-saga/effects'
import assert from 'assert'
import {
  userController,
} from 'apiService'
import {
  workerUserListSaga,
} from 'sagas'
import {
  receiveUserListRedux,
} from 'actions'

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
//   ReactDOM.unmountComponentAtNode(div)
// })

test('getUserLisr Saga test', () => {
  const products = [1]
  const generator = workerUserListSaga({
    payload: {
      params: {}
    }
  })

  let next = generator.next()
  assert.deepEqual(JSON.stringify(next.value), JSON.stringify(call(userController().getUserList, {})), 'must yield userController().getProducts')

  next = generator.next(products)
  assert.deepEqual(next.value, put(receiveUserListRedux(products)), 'must yield receiveUserListRedux(products)')
})