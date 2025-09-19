import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamsApi } from "../../services/hr/teams";

export const useTeamMembers = (params) => {
  return useQuery({
    queryKey: ["team-members", params],
    queryFn: () => teamsApi.getAll(params),
  });
};

export const useTeamMember = (id) => {
  return useQuery({
    queryKey: ["team-members", id],
    queryFn: () => teamsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => teamsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export const useUpdateTeamMember = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => teamsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members", id] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};