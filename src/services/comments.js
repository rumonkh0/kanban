import apiClient from "../lib/axios";

export const commentsApi = {
  getAll: async (taskId) => {
    // Assuming /comments endpoint can filter by a resource ID via params
    const response = await apiClient.get(`/tasks/${taskId}/comments`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch comments");
  },

  getById: async (id) => {
    const response = await apiClient.get(`/comments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch comment");
  },

  create: async (taskId, data) => {
    const response = await apiClient.post(`/tasks/${taskId}/comments`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to post comment");
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/comments/${id}`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update comment");
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/comments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete comment");
  },
};
