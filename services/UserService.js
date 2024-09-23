import axiosInstance from "./AuthService";

export const getUser = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

export const editUser = async (user) => {
  const response = await axiosInstance.put("/users", user);
  return response.data;
};

//Search users by keyword (displayName, email, phone, or userName)

export const searchUser = async (userKeyword) => {
  const response = await axiosInstance.get(
    `/users/search?keyword=${userKeyword}`
  );
  return response.data;
};

export const getListFollower = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}/followers`);
  return response.data;
};

export const followUSer = async (userId) => {
  const response = await axiosInstance.post(`/users/${userId}/follow`);
  return response.data;
};

export const unfollowUSer = async (userId) => {
  const response = await axiosInstance.post(`/users/${userId}/unfollow`);
  return response.data;
};
