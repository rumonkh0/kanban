import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { freelancersApi } from "../services/team";
import { useNavigate } from "react-router";

// Get all team members
export const useTeamMembers = (params) => {
  return useQuery({
    queryKey: ["teamMembers", params],
    queryFn: () => freelancersApi.getAll(params),
  });
};

// Get single team member
export const useTeamMember = (id) => {
  return useQuery({
    queryKey: ["teamMembers", id],
    queryFn: () => freelancersApi.getById(id),
    enabled: !!id,
  });
};

// Create team member
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => freelancersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
};

// Update team member
export const useUpdateTeamMember = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => freelancersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers", id] });
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      navigate("/hr/team-members");
    },
  });
};

// Delete team member
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => freelancersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: (error) => {
      console.error("Error deleting team member:", error);
    },
  });
};

// Get projects assigned to a team member
export const useTeamMemberProjects = (id) => {
  return useQuery({
    queryKey: ["teamMembers", id, "projects"],
    queryFn: () => freelancersApi.getProjects(id),
    enabled: !!id,
  });
};
