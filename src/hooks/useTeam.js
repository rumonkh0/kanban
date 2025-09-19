import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "../services/team";

export const useTeamMembers = (params) => {
  return useQuery({
    queryKey: ["team-members", params],
    queryFn: () => teamApi.getAll(params),
  });
};

export const useTeamMember = (id) => {
  return useQuery({
    queryKey: ["team-members", id],
    queryFn: () => teamApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => teamApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export const useUpdateTeamMember = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => teamApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", id] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => teamApi.getDepartments(),
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => teamApi.getRoles(),
  });
};

export const useAppreciations = () => {
  return useQuery({
    queryKey: ["appreciations"],
    queryFn: () => teamApi.getAppreciations(),
  });
};
