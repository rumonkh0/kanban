import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../services/tasks";

export const useTasks = (params) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => tasksApi.getAll(params),
  });
};

export const useTask = (id) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tasksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTaskStatus = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status) => tasksApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useAssignTaskMember = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId) => tasksApi.assignMember(id, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
  });
};
