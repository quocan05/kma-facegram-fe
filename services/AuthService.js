import axios from "axios";
import { baseConfig } from "../configs/baseConfig";
import { getToken } from "./storage";
import { TOKEN } from "../constants/variables";

// Tạo instance của axios
const axiosInstance = axios.create({
  baseURL: baseConfig.baseURL,
});

// Interceptor cho request để thêm token vào headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log(baseConfig);
      const token = await getToken(TOKEN.AUTH_TOKEN);
      if (token) {
        console.log("token:", token);
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
      console.error("Error in response interceptor:", error.response.data);
      if (error.response.status === 401) {
        console.error("Unauthorized, redirecting to login...");
        // Có thể thêm logic để chuyển hướng người dùng đến màn hình đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
