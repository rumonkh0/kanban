import apiClient from "../lib/axios";

export const authApi = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data?.success) return response.data;
    throw new Error(response.data?.message || "Login failed");
  },

  // Request password reset
  forgotPassword: async (email) => {
    const response = await apiClient.post("/auth/forgotpassword", { email });
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to send forgot password email"
    );
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await apiClient.post("/auth/resetpassword", data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to reset password");
  },

  // Verify OTP
  verifyOtp: async (data) => {
    const response = await apiClient.post("/auth/verifyotp", data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to verify OTP");
  },
};
