import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  console.log("Logout component mounted");
  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return null;
}

export default Logout;
