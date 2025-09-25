import apiClient from "../../lib/axios";

export const departmentsApi = {
  // Get all departments
  getAll: async () => {
    const response = await apiClient.get("/departments", {});

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch departments");
  },

  // Get single department
  getById: async (id) => {
    const response = await apiClient.get(`/departments/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch department");
  },

  // Create new department
  create: async (data) => {
    const response = await apiClient.post("/departments", data);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create department");
  },

  // Update department
  update: async (id, data) => {
    const response = await apiClient.put(`/departments/${id}`, data);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update department");
  },

  // Delete department
  delete: async (id) => {
    const response = await apiClient.delete(`/departments/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete department");
  },
};
