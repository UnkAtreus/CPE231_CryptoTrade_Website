export const getAccessToken = () => localStorage.getItem("access-token") || "";

export const isLoggedIn = () => {
  return !!getAccessToken();
};
