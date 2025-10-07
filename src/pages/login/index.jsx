import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/authStore";

function LoginLayout() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen p-4 flex flex-col items-center gap-8 md:gap-12">
      <img src="/logo.png" alt="Logo" className="h-20 md:h-20 mt-4 md:mt-8" />
      <div className="w-full max-w-[452px] p-4 md:p-6 bg-surface2 border border-divider rounded-lg flex flex-col gap-6 md:gap-8">
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;
