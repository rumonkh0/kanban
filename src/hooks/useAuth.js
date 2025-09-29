import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import { useNavigate } from "react-router";

// Login hook
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      navigate("/dashboard/private");
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
