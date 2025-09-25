import apiClient from "../lib/axios";

export const servicesApi = {
  // Get all services
  getAll: async (params) => {
    const response = await apiClient.get("/services", { params });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch services");
  },

  // Get single service
  getById: async (id) => {
    const response = await apiClient.get(`/services/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch service");
  },

  // Create new service
  create: async (data) => {
    const response = await apiClient.post("/services", data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create service");
  },

  // Update service
  update: async (id, data) => {
    const response = await apiClient.put(`/services/${id}`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update service");
  },

  // Delete service
  delete: async (id) => {
    const response = await apiClient.delete(`/services/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete service");
  },
};
