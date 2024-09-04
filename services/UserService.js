import axiosInstance from "./AuthService";

export const getUser = (userId) => {
  const response = axiosInstance.get(`/users/${userId}`);
  return response.data;
};
