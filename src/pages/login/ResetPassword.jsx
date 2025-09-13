import React, { useState } from "react";
import { FormField, Icon, Input, RedButton } from "../../components/Component";
import { Link } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Log In</h4>
        <Link to="/forgot-password" className="typo-cta">
          Forgot Password
        </Link>
      </div>
      <div className="flex flex-col gap-2">
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
              placeholder={`Enter Password`}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? "eye" : "eye"} className="w-5 h-5" />
            </button>
          </div>
        </div>
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
              placeholder={`Enter Password`}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? "eye" : "eye"} className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="noDeadline"
            className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
          />
          <label htmlFor="noDeadline" className="typo-b3 text-text">
            Remember Me
          </label>
        </div>
      </div>
      <RedButton className="typo-cta py-3">Log In</RedButton>
    </>
  );
}

export default Login;
