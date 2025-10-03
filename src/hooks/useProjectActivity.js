import { useQuery } from "@tanstack/react-query";
import { projectActivityAPI } from "../services/projectActivity";

export const useProjectActivities = (params) => {
  return useQuery({
    queryKey: ["notes", params],
    queryFn: () => projectActivityAPI.getAll(params),
    enabled: !!params,
  });
};
