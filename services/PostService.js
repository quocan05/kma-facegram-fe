import axiosInstance from "./AuthService";

export const getAllPost = async () => {
  const response = await axiosInstance.get("/posts/suggest");
  return response.data;
};

export const getPostDetailById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

export const createNewPost = async (param) => {
  const response = await axiosInstance.post("/posts", param);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

export const likePost = async (param) => {
  const response = await axiosInstance.post("/react/", param);
  return response.data;
};

export const getPostOfUser = async (userId) => {
  const response = await axiosInstance.get(`/posts?userId=${userId}`);
  return response.data;
};

export const dislikePost = async (postId) => {
  const response = await axiosInstance.delete(`/react/${postId}`);
  return response.data;
};

export const commentPost = async (param) => {
  const response = await axiosInstance.post("/comments", param);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};
