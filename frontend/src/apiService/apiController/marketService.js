import apiService from '../apiService'

export const marketController = (configService = {}) => {
  const service = apiService(configService)
  return {
    getPrice: (params) => {
      return service.get(`ticker/price?${params}`, params , "binance")
    },
    get24Price: (params) => {
      return service.get(`ticker/24hr?${params}`, params , "binance")
    },
    getOrderBook: (params) => {
      return service.get(`depth?${params}`, params , "binance")
    },
  }
}
