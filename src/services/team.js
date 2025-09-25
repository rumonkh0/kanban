// freelancers.js
import apiClient from "../lib/axios";

export const freelancersApi = {
  // Get all freelancers
  getAll: async () => {
    const response = await apiClient.get("/freelancers");

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch freelancers");
  },

  // Get single freelancer
  getById: async (id) => {
    const response = await apiClient.get(`/freelancers/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch freelancer");
  },

  // Create new freelancer
  create: async (data) => {
    const response = await apiClient.post("/freelancers", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create freelancer");
  },

  // Update freelancer
  update: async (id, data) => {
    const response = await apiClient.put(`/freelancers/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update freelancer");
  },

  // Delete freelancer
  delete: async (id) => {
    const response = await apiClient.delete(`/freelancers/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete freelancer");
  },

  // Example: get all projects assigned to a freelancer
  getProjects: async (id) => {
    const response = await apiClient.get(`/freelancers/${id}/projects`);

    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to fetch freelancer projects"
    );
  },
};
