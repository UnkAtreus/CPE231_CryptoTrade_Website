import axios from "axios";
import {
  BASE_API_LOCAL,
  BASE_PATH_API_LOCAL,
  BASE_API_BINANCE,
  BASE_PATH_API_BINANCE,
} from "./apiConfig";
import { isValidResponse } from "helpers";

const getConfig = (configService, apiName) => {
  var config = {
    baseURL: "",
    headers: {},
    params: {},
  };
  switch (apiName) {
    case "binance":
      config = {
        baseURL: BASE_API_BINANCE + BASE_PATH_API_BINANCE,
        headers: {},
        params: {},
      };
      if (configService.params) {
        config.params = configService.params;
      }
      return config;
    case "local":
      config = {
        baseURL: BASE_API_LOCAL + BASE_PATH_API_LOCAL,
        headers: {},
        params: {},
      };
      if (configService.params) {
        config.params = configService.params;
      }
      return config;

    default:
      config = {
        baseURL: BASE_API_LOCAL + BASE_PATH_API_LOCAL,
        headers: {},
        params: {},
      };
  }
  if (configService.params) {
    config.params = configService.params;
  }
  return config;
};

const axiosSuccess = (res) => {
  if (isValidResponse(res)) {
    return res.data;
  } else {
    return false;
  }
};

const axiosError = (error) => {
  console.log(error.message);
  return false;
};

const axiosService = (type, url, params, configService, apiName) => {
  let config = getConfig(configService, apiName);
  switch (type) {
    case "get":
      return axios.get(url, config).then(axiosSuccess).catch(axiosError);
    case "post":
      return axios
        .post(url, params, config)
        .then(axiosSuccess)
        .catch(axiosError);
    default:
      return false;
  }
};

export default (configService = {}) => {
  return {
    get: (url, params, apiName) =>
      axiosService("get", url, params, configService, apiName),
    post: (url, params, apiName) =>
      axiosService("post", url, params, configService, apiName),
  };
};
