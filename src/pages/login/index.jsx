import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useAppStore } from "../../stores/theme";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const RECAPTCHA_SITE_KEY_V3 = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function LoginLayout() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const bgImage = theme?.loginBackgroundImage
    ? `${baseURL}/${theme.loginBackgroundImage.filePath}`
    : "";

  let logo;
  if (theme?.adminTheme === "dark" && theme?.darkModeLogo) {
    logo = theme?.darkModeLogo
      ? `${baseURL}/${theme.darkModeLogo.filePath}`
      : "/logo.png";
  } else {
    logo = theme?.lightModeLogo
      ? `${baseURL}/${theme.lightModeLogo.filePath}`
      : "/logo.png";
  }

  if (token && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY_V3}>
      <div className="relative w-full min-h-screen p-4 flex flex-col items-center gap-8 md:gap-12">
        <div
          className="
    absolute inset-0 z-0 
    bg-cover bg-center bg-no-repeat 
    opacity-20
    pointer-events-none
  "
          style={{
            backgroundImage: `url('${bgImage}')`,
          }}
        ></div>
        <img src={logo} alt="Logo" className="h-20 md:h-20 mt-4 md:mt-8" />
        <div className="w-full max-w-[452px] p-4 md:p-6 bg- border border-divider rounded-lg flex flex-col gap-6 md:gap-8">
          <Outlet />
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default LoginLayout;
