import { useNavigate } from "react-router";

export const useBack = (fallback = "/") => {
  const navigate = useNavigate();

  const safeGoBack = () => {
    if (window.history.state && window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return safeGoBack;
};
