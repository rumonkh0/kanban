import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

// Login hook
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (res) => {
      const { token, data } = res;
      const login = useAuthStore.getState().login;
      login(token);

      const userRole = data?.role;
      switch (userRole) {
        case "Admin":
          navigate("/dashboard/private");
          break;
        case "Client":
          navigate("/client");
          break;
        case "Freelancer":
          navigate("/member");
          break;
        default:
          navigate("/login"); // Default route for unlisted roles
          break;
      }
    },
  });
};

// Forgot Password hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authApi.forgotPassword(email),
  });
};

// Reset Password hook
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => authApi.resetPassword(data),
  });
};

// Verify OTP hook
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data) => authApi.verifyOtp(data),
  });
};
