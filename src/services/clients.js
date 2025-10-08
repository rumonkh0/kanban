import apiClient from "../lib/axios";

export const clientsApi = {
  // Get all clients
  getAll: async (params) => {
    const response = await apiClient.get("/clients", { params });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch clients");
  },

  // Get single client
  getById: async (id) => {
    const response = await apiClient.get(`/clients/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch client");
  },

  // Get single client
  getClientDetailsById: async (id) => {
    const response = await apiClient.get(`/clients/${id}/details`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch client");
  },

  // Create new client
  create: async (data) => {
    const response = await apiClient.post("/clients", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create client");
  },

  // Update client
  update: async (id, data) => {
    const response = await apiClient.put(`/clients/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update client");
  },

  // Delete client
  delete: async (id) => {
    const response = await apiClient.delete(`/clients/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete client");
  },

  getProjects: async (id) => {
    const response = await apiClient.get(`/clients/${id}/projects`);
    return response.data;
  },
};
