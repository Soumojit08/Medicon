import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:3000" : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.error("Session expire. Try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
