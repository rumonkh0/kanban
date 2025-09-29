import React, { useState } from "react";
import { FormField, Icon, Input, RedButton } from "../../components/Component";
import { Link } from "react-router";
import { useLogin } from "../../hooks/useAuth";

function Login() {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [, setError] = useState(null);
  const loginMutation = useLogin();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    loginMutation.mutate(formData, {
      onError: (err) => {
        setError(err.message || "Login failed");
      },
    });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Log In</h4>
        <Link to="/forgot-password" className="typo-cta">
          Forgot Password
        </Link>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <FormField label="Email" required>
          <Input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e)}
          />
        </FormField>

        <FormField label="Password" required>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e)}
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
        </FormField>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
          />
          <label htmlFor="rememberMe" className="typo-b3 text-text">
            Remember Me
          </label>
        </div>
        <RedButton
          type="submit"
          className="typo-cta py-3 w-full mt-4"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging In..." : "Log In"}
        </RedButton>
      </form>
    </>
  );
}

export default Login;
