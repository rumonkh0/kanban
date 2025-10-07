import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../services/projects";
// import { useNavigate } from "react-router";

export const useProjects = (params, options = {}) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => projectsApi.getAll(params),
    ...options, // allow passing enabled, staleTime, etc.
  });
};
export const useProject = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
};
export const useProjectDetails = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsApi.getDetails(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = (id) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => projectsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projectMembers"] });
      // navigate(-1);
    },
  });
};

export const useProjectMembers = (id) => {
  return useQuery({
    queryKey: ["projectMembers", id, "members"],
    queryFn: () => projectsApi.getMembers(id),
    enabled: !!id,
  });
};
export const useUpdateProjectMember = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => projectsApi.updateMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectMembers", id] });
      queryClient.invalidateQueries({ queryKey: ["projectMembers"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId) => projectsApi.delete(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useRemoveProjectMember = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId) => projectsApi.removeMember(projectId, memberId),
    onSuccess: () => {
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["projectMembers", projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["projectMembers"] });
    },
    onError: (error) => {
      console.error("Error removing member:", error);
    },
  });
};

export const useProjectTasks = (id) => {
  return useQuery({
    queryKey: ["projects", id, "tasks"],
    queryFn: () => projectsApi.getTasks(id),
    enabled: !!id,
  });
};

export const useProjectNotes = (id) => {
  return useQuery({
    queryKey: ["projects", id, "notes"],
    queryFn: () => projectsApi.getNotes(id),
    enabled: !!id,
  });
};

export const useProjectActivity = (id) => {
  return useQuery({
    queryKey: ["projects", id, "activity"],
    queryFn: () => projectsApi.getActivity(id),
    enabled: !!id,
  });
};
