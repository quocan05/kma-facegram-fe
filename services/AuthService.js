import axios from "axios";
import { useRouter } from "expo-router";
import { baseConfig } from "../configs/baseConfig";
import { getToken } from "./storage";

// Tạo instance của axios
const axiosInstance = axios.create({
  baseURL: baseConfig.baseURL,
});

const router = useRouter();

// Interceptor cho request để thêm token vào headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log(baseConfig);
      const token = await getToken("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response để xử lý lỗi và phản hồi thành công
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công
    return response; // Trả về dữ liệu từ phản hồi
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      console.error(error.response.message);
      if (error.response.status === 401) {
        console.error("Unauthorized, redirecting to login...");
        router.replace("Login");
      }
      if (error.response.status === 400) {
        console.log(error.response.data.msg);
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
