import React, { useEffect, useState, useRef } from "react";
import { FormField, Icon, Input, RedButton } from "../../components/Component";
import { Link } from "react-router"; // Changed from 'react-router' to 'react-router-dom' (standard)
import { useLogin } from "../../hooks/useAuth";
import { useRecaptchaSetting } from "../../hooks/useRecaptchaSetting.js"; // ⬅️ NEW: Custom hook for fetching setting
import { toast } from "react-toastify";

// ⬇️ RECAPTCHA IMPORTS
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// ⬇️ DEFINE SITE KEYS (Replace with your actual keys)
const RECAPTCHA_SITE_KEY_V2 = import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY;
const RECAPTCHA_SITE_KEY_V3 = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@mail.com",
    password: "aaaaaaaa",
  });
  const [error, setError] = useState(null);

  // ⬇️ RECAPTCHA STATE/HOOKS
  const { data: recaptchaVersion, isLoading: isLoadingRecaptcha } =
    useRecaptchaSetting();
  const recaptchaRef = useRef(null); // Ref for v2 component
  const { executeRecaptcha } = useGoogleReCaptcha(); // Hook for v3

  const loginMutation = useLogin();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e) => {
    // ⬅️ Made async to handle V3 token generation
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    let recaptchaToken = null;

    // --- 1. Handle reCAPTCHA Token Generation ---
    if (recaptchaVersion === "v2") {
      recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        toast.error("Please complete the reCAPTCHA challenge.");
        return;
      }
    } else if (recaptchaVersion === "v3" && executeRecaptcha) {
      // V3 is invisible; generate token upon login attempt
      recaptchaToken = await executeRecaptcha("login");
    }

    // Prepare payload, including the token (it will be null/undefined if version is 'none')
    const payload = {
      ...formData,
      recaptchaToken: recaptchaToken,
    };

    // --- 2. Mutate (Submit) ---
    loginMutation.mutate(payload, {
      onError: (err) => {
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Login failed"
        );
      },
      onSuccess: () => {
        toast.success("Login Success!", { autoClose: 1300 });
      },
      onSettled: () => {
        // 3. Reset V2 widget on error/success to force new check on next attempt
        if (recaptchaVersion === "v2" && recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const loadingState = isLoadingRecaptcha || loginMutation.isPending;

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
            onChange={(value) => handleChange("email", value)}
          />
        </FormField>

        <FormField label="Password" required>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
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

        {/* ⬇️ CONDITIONAL RECAPTCHA RENDERING ⬇️ */}
        {recaptchaVersion === "v2" && RECAPTCHA_SITE_KEY_V2 && (
          <div className="mt-2">
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY_V2} />
          </div>
        )}
        {/* V3 is invisible, so no component is rendered */}

        <RedButton
          type="submit"
          className="typo-cta py-3 w-full mt-4"
          disabled={loadingState}
        >
          {loadingState ? "Loading..." : "Log In"}
        </RedButton>
      </form>
    </>
  );
}

export default Login;

// import React, { useEffect, useState } from "react";
// import { FormField, Icon, Input, RedButton } from "../../components/Component";
// import { Link } from "react-router";
// import { useLogin } from "../../hooks/useAuth";
// import { toast } from "react-toastify";

// function Login() {
//   // const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "admin@mail.com", password: "aaaaaaaa" });
//   const [error, setError] = useState(null);
//   const loginMutation = useLogin();

//   const togglePassword = () => setShowPassword(!showPassword);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!formData.email || !formData.password) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     loginMutation.mutate(formData, {
//       onError: (err) => {
//         setError(err.response?.data?.error || err.message || "Login failed");
//       },
//       onSuccess: () => {
//         toast.success("Login Success!", { autoClose: 1300 });
//       },
//     });
//   };
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <h4 className="typo-h4">Log In</h4>
//         <Link to="/forgot-password" className="typo-cta">
//           Forgot Password
//         </Link>
//       </div>
//       <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//         <FormField label="Email" required>
//           <Input
//             type="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={(e) => handleChange("email", e)}
//           />
//         </FormField>

//         <FormField label="Password" required>
//           <div className="relative">
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter Password"
//               value={formData.password}
//               onChange={(e) => handleChange("password", e)}
//             />
//             <button
//               type="button"
//               onClick={togglePassword}
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               <Icon name={showPassword ? "eye" : "eye"} className="w-5 h-5" />
//             </button>
//           </div>
//         </FormField>
//         {/*
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             id="rememberMe"
//             className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
//           />
//           <label htmlFor="rememberMe" className="typo-b3 text-text">
//             Remember Me
//           </label>
//         </div> */}
//         <RedButton
//           type="submit"
//           className="typo-cta py-3 w-full mt-4"
//           disabled={loginMutation.isPending}
//         >
//           {loginMutation.isPending ? "Logging In..." : "Log In"}
//         </RedButton>
//       </form>
//     </>
//   );
// }

// export default Login;
