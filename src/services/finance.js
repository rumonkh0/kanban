import apiClient from "../lib/axios";

export const financeApi = {
  // ----- Paid From -----
  getAllPaidFrom: async (params) => {
    const response = await apiClient.get("/payments", { params });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch Paid From");
  },

  getPaidFromById: async (id) => {
    const response = await apiClient.get(`/payments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch Paid From");
  },

  createPaidFrom: async (data) => {
    const response = await apiClient.post("/payments", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create Paid From");
  },

  updatePaidFrom: async (id, data) => {
    const response = await apiClient.put(`/payments/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update Paid From");
  },

  deletePaidFrom: async (id) => {
    const response = await apiClient.delete(`/payments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete Paid From");
  },

  // ----- Paid To -----
  getAllPaidTo: async (params) => {
    const response = await apiClient.get("/team-payments", { params });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch Paid To");
  },

  getPaidToById: async (id) => {
    const response = await apiClient.get(`/team-payments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch Paid To");
  },

  createPaidTo: async (data) => {
    const response = await apiClient.post("/team-payments", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create Paid To");
  },

  updatePaidTo: async (id, data) => {
    const response = await apiClient.put(`/team-payments/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update Paid To");
  },

  deletePaidTo: async (id) => {
    const response = await apiClient.delete(`/team-payments/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete Paid To");
  },
};
