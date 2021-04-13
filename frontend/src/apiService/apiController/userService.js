import apiService from '../apiService'

const apiPath = '/api'

export const userController = (configService = {}) => {
  const service = apiService(configService)
  return {
    getUserList: (params) => {
      return service.get(`${apiPath}/users`, params)
    },
  }
}
