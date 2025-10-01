import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMembersApi } from "../services/projectMembers";

// 🔹 Get all members of a project
export const useProjectMembers = (projectId) => {
  return useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: () => projectMembersApi.getAll(projectId),
    enabled: !!projectId, // only run if projectId is provided
  });
};

// 🔹 Add a member
export const useAddProjectMember = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => projectMembersApi.add(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectMembers", projectId],
      });
    },
  });
};

// 🔹 Update a member
export const useUpdateProjectMember = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => projectMembersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectMember", id],
      });
    },
  });
};

// 🔹 Remove a member
export const useRemoveProjectMember = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId) => projectMembersApi.remove(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectMembers", projectId],
      });
    },
  });
};
