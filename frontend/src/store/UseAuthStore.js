import create from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  role: localStorage.getItem("role") || null, // Store role in localStorage
  isAuthenticated: !!localStorage.getItem("role"),

  login: async (credentials) => {
    try {
      const { data } = await axiosInstance.post("/login", credentials);
      localStorage.setItem("role", data.role); // Save role to localStorage
      set({ user: data.user, role: data.role, isAuthenticated: true });
      toast.success("Logged In Successfull");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/logout");
      localStorage.removeItem("role"); // Remove role from localStorage
      set({ user: null, role: null, isAuthenticated: false });
      toast.success("Logged In Successfull");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  signup: async (userData) => {
    try {
      const { data } = await axiosInstance.post("/signup", userData);
      localStorage.setItem("role", data.role); // Save role to localStorage
      set({ user: data.user, role: data.role, isAuthenticated: true });
      toast.success("Signup successfully");
    } catch (error) {
      toast.error("Signup failed");
    }
  },
}));

export default useAuthStore;
