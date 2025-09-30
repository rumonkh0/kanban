import apiClient from "../lib/axios";

export const tasksApi = {
  getAll: async (params, projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/tasks`, {
      params,
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch tasks");
  },

  getById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || `Failed to fetch task ${id}`);
  },

  create: async (data) => {
    const response = await apiClient.post("/tasks", data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create task");
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/tasks/${id}`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || `Failed to update task ${id}`);
  },

  updateOrder: async (id, prev, next, newStage) => {
    const response = await apiClient.put(`/tasks/${id}/reorder`, { prev, next, newStage });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || `Failed to update task ${id}`);
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || `Failed to delete task ${id}`);
  },
};
