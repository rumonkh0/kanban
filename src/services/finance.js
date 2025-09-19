import apiClient from "../lib/axios";

export const financeApi = {
  getAllPaidFrom: (params) => apiClient.get("/paid-from", { params }),
  getPaidFromById: (id) => apiClient.get(`/paid-from/${id}`),
  createPaidFrom: (data) => apiClient.post("/paid-from", data),
  updatePaidFrom: (id, data) => apiClient.put(`/paid-from/${id}`, data),
  deletePaidFrom: (id) => apiClient.delete(`/paid-from/${id}`),
  getAllPaidTo: (params) => apiClient.get("/paid-to", { params }),
  getPaidToById: (id) => apiClient.get(`/paid-to/${id}`),
  createPaidTo: (data) => apiClient.post("/paid-to", data),
  updatePaidTo: (id, data) => apiClient.put(`/paid-to/${id}`, data),
  deletePaidTo: (id) => apiClient.delete(`/paid-to/${id}`),
};
