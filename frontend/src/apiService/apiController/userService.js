import apiService from "../apiService";

export const userController = (configService = {}) => {
  const service = apiService();
  return {
    postFile: (params) => {
      return service.post(`upload`, params, "local");
    },
  };
};
