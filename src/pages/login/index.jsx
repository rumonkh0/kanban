import { Outlet } from "react-router";

function Login() {
  return (
    <div className="w-full p-4 flex flex-col items-center gap-12">
      <img src="/logo.png" alt="" className="h-12" />
      <div className="w-[452px] p-4 bg-surface2 border border-divider rounded-lg flex flex-col gap-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Login;
