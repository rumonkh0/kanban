import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Add request interceptor to handle auth
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //  useAuthStore.getState().logout()
      // localStorage.removeItem("token");
      // if (window.location.pathname !== "/login")
      //  window.location.href= "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
