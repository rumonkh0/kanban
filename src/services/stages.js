import apiClient from "../lib/axios";

export const stagesApi = {
  // Get all stages
  getAll: async () => {
    const response = await apiClient.get("/stages");

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch stages");
  },

  // Get single stage by ID
  getById: async (id) => {
    const response = await apiClient.get(`/stages/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch stage");
  },

  // Create new stage
  create: async (data) => {
    const response = await apiClient.post("/stages", data);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create stage");
  },

  // Update stage
  update: async (id, data) => {
    const response = await apiClient.put(`/stages/${id}`, data);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update stage");
  },

  // Update stage order
  updateOrder: async (id, prev, next) => {
    // console.log(prev, next)
    const response = await apiClient.put(`/stages/${id}/reorder`, { prev, next });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update stage");
  },

  // Delete stage
  delete: async (id) => {
    const response = await apiClient.delete(`/stages/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete stage");
  },
};
