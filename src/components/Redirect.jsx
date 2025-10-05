import { Navigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

const ProtectedRedirect = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  console.log("from redirect.jsx");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // redirect based on role
  if (user?.role === "Admin") return <Navigate to="/dashboard" replace />;
  if (user?.role === "Freelancer") return <Navigate to="/member" replace />;
  if (user?.role === "Client") return <Navigate to="/client" replace />;

  // fallback if role is unknown
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRedirect;
