import { useCallback } from "react";
import { useAuthStore } from "../stores/authStore";
import { useAppStore } from "../stores/theme";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function useTheme() {
  const user = useAuthStore((state) => state.user);
  const setTheme = useAppStore((state) => state.setTheme);
  const setCompany = useAppStore((state) => state.setCompany);
  const applyTheme = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/alltheme`)
      .then((res) => res.json())
      .then((res) => {
        setTheme(res.data.theme || {});
        setCompany(res.data.company || {});
        let link = document.querySelector("link[rel~='icon']");
        link.href = res?.data?.theme?.faviconImage
          ? `${baseURL}/${res?.data?.theme?.faviconImage}`
          : "/logo.png";
        if (res?.data?.theme?.appName)
          document.title = res?.data?.theme?.appName;
        if (user?.role === "Admin" && res?.data?.theme?.adminPrimaryColor)
          document.documentElement.style.setProperty(
            "--brand",
            res?.data?.theme?.adminPrimaryColor
          );
        if (
          user?.role === "Freelancer" &&
          res?.data?.theme?.employeePrimaryColor
        )
          document.documentElement.style.setProperty(
            "--brand",
            res?.data?.theme?.employeePrimaryColor
          );
        if (user?.role === "Client" && res?.data?.theme?.clientPrimaryColor)
          document.documentElement.style.setProperty(
            "--brand",
            res?.data?.theme?.clientPrimaryColor
          );
        // console.log(res);
      });
  }, []);

  return applyTheme;
}

export default useTheme;
