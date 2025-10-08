import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

function useTheme() {
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/theme`)
      .then((res) => res.json())
      .then((theme) => {
        if (user?.role === "Admin")
          document.documentElement.style.setProperty(
            "--brand",
            theme?.data?.adminPrimaryColor
          );
        if (user?.role === "Freelancer")
          document.documentElement.style.setProperty(
            "--brand",
            theme?.data?.employeePrimaryColor
          );
        if (user?.role === "Client")
          document.documentElement.style.setProperty(
            "--brand",
            theme?.data?.clientPrimaryColor
          );
        console.log(theme);
      });
  }, []);
}

export default useTheme;
