
import axios from 'axios'
import {
  BASE_API,
  BASE_PATH_API,
} from './apiConfig'
import {
  isValidResponse,
} from 'helpers'
const getConfig = (configService) => {
  const config = {
    baseURL: BASE_API + BASE_PATH_API,
    headers: {},
    params: {}
  }
  if (configService.params) {
    config.params = configService.params
  }
  return config
}

const axiosSuccess = (res) => {
  if (isValidResponse(res)) {
    return res.data
  }
  else {
    return false
  }
}

const axiosError = (error) => {
  console.log(error.message)
  return false
}

const axiosService = (type, url, params, configService) => {
  let config = getConfig(configService)
  switch (type) {
    case 'get': return axios.get(url, config).then(axiosSuccess).catch(axiosError)
    case 'post': return axios.post(url, params, config).then(axiosSuccess).catch(axiosError)
    default: return false
  }
}

export default (configService = {}) => {
  return {
    get: (url, params) => axiosService('get', url, params, configService),
    post: (url, params) => axiosService('post', url, params, configService),
  }
}