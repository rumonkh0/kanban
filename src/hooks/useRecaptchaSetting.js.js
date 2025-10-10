import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/axios";

export const useRecaptchaSetting = () => {
  return useQuery({
    queryKey: ["recaptchaSetting"],
    queryFn: async () => {
      const res = await apiClient.get("/settings/security");
      return res.data.data?.recaptchaVersion;
    },
  });
};
 