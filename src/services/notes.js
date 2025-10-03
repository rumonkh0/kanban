import apiClient from "../lib/axios";

export const noteAPI = {
  getAll: async (params) => {
    const response = await apiClient.get(`/notes`, { params });
    return response.data.data;
  },
  // Get single note
  getById: async (id) => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data.data;
  },

  // Create new note
  create: async (data) => {
    const response = await apiClient.post("/notes", data);
    return response.data.data;
  },

  // Update note
  update: async ({ id, data }) => {
    const response = await apiClient.put(`/notes/${id}`, data);
    return response.data.data;
  },

  // Delete note
  delete: async (id) => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data.data;
  },
};
