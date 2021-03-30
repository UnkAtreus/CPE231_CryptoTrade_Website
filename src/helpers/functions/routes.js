import {
  store,
} from 'store'

export const redirect = (path) => {
  const {
    routeHistoryRedux,
  } = store.getState()
  routeHistoryRedux.push(path)
}
