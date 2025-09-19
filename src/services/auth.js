import apiClient from "../lib/axios";

export const authApi = {
  login: (credentials) => apiClient.post("/auth/login", credentials),

  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),

  resetPassword: (data) => apiClient.post("/auth/reset-password", data),

  verifyOtp: (data) => apiClient.post("/auth/verify-otp", data),
};
