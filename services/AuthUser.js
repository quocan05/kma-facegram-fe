import { TOKEN } from "../constants/variables";
import axiosInstance from "./AuthService";
import { removeToken, setToken } from "./storage";

export const authLogin = async (param) => {
  const response = await axiosInstance.post("/auth/login", param);
  if (response) {
    const token = response.data.user.token;
    await setToken(TOKEN.AUTH_TOKEN, token);
  }
  return response.data;
};

export const authLogout = async () => {
  return await removeToken(TOKEN.AUTH_TOKEN);
};

export const authRegister = async (param) => {
  const response = await axiosInstance.post("/auth/register", param);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/users/me");
  console.log(response.data);
  return response.data;
};
