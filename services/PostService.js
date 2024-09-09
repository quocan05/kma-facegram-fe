import axiosInstance from "./AuthService";

export const getAllPost = async () => {
  const response = await axiosInstance.get("/posts/suggest");
  return response.data;
};

export const createNewPost = async (param) => {
  const response = await axiosInstance.post("/posts", param);
  return response.data;
};

export const likePost = async (param) => {
  const response = await axiosInstance.post("/react/", param);
  return response.data;
};
