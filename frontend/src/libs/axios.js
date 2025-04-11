import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : "http://ec2-98-81-123-148.compute-1.amazonaws.com:3000";

console.log("Current environment:", import.meta.env.MODE);
console.log("Using API baseURL:", baseURL);

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.error("Session expired. Please login again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
