import axiosInstance from "./AuthService";

export const getUser = (userId) => {
  const response = axiosInstance.get(`/users/${userId}`);
  return response.data;
};

export const editUser = (user) => {
  const response = axiosInstance.put("/users", user);
  return response.data;
};
