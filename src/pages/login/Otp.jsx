import React, { useState } from "react";
import { FormField, Input, RedButton } from "../../components/Component";
import { useLocation } from "react-router";
import Icon from "../../components/Icon";
import { useResetPassword } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Otp() {
  const location = useLocation();
  const navigate = useNavigate();
  const resetPassword = useResetPassword();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleResetPassword = () => {
    if (!otp || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    resetPassword.mutate(
      { email, otp, newPassword: password },
      {
        onSuccess: () => {
          toast.success("Password reset successful!"), navigate("/login");
        },
        onError: (err) => {
          const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to reset password.";
          toast.error(message);
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Reset Password</h4>
      </div>

      <div className="flex flex-col gap-2">
        <FormField label="OTP" required>
          <Input
            type="text"
            placeholder="Enter otp"
            value={otp}
            onChange={(e) => setOtp(e)}
          />
        </FormField>

        <div className="flex flex-col gap-2 mt-2">
          <label className="flex justify-between items-center w-full typo-b2 text-text2">
            <span>Password</span>
            <span className="text-[10px] text-text2">
              Must have at least 8 characters
            </span>
          </label>

          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name="eye" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="flex justify-between items-center w-full typo-b2 text-text2">
            <span>Confirm Password</span>
            <span className="text-[10px] text-text2">
              Must have at least 8 characters
            </span>
          </label>

          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name="eye" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <RedButton
        className="typo-cta py-3"
        onClick={handleResetPassword}
        disabled={resetPassword.isPending}
      >
        {resetPassword.isPending ? "Resetting password..." : `Reset Password`}
      </RedButton>
    </>
  );
}

export default Otp;
