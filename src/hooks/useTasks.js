import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../services/tasks";

// Get all tasks
export const useTasks = (params, projectId) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => tasksApi.getAll(params, projectId),
    enabled: !!projectId,
    onError: (error) => {
      console.error("Error fetching tasks:", error.message);
    },
  });
};

// Get single task
export const useTask = (id) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
    onError: (error) => {
      console.error(`Error fetching task ${id}:`, error.message);
    },
  });
};

// Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tasksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error.message);
    },
  });
};

// Update task
export const useUpdateTask = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error(`Error updating task ${id}:`, error.message);
    },
  });
};

// Update task
export const useUpdateTaskOrder = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, prev, next, stage }) =>
      tasksApi.updateOrder(id, prev, next, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error(`Error updating task ${id}:`, error.message);
    },
  });
};

// Update task status
export const useUpdateTaskStatus = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status) => tasksApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error(`Error updating status for task ${id}:`, error.message);
    },
  });
};

// Assign member to task
export const useAssignTaskMember = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId) => tasksApi.assignMember(id, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
    onError: (error) => {
      console.error(`Error assigning member to task ${id}:`, error.message);
    },
  });
};
