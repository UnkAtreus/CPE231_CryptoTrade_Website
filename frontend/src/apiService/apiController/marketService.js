import apiService from '../apiService'

export const marketController = (configService = {}) => {
  const service = apiService(configService)
  return {
    getPrice: (params) => {
      return service.get(`ticker/price?${params}`, params , "binance")
    },
  }
}
