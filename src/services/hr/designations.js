import apiClient from "../lib/axios";

export const designationsApi = {
  getAll: (params) => apiClient.get("/designations", { params }),
  getById: (id) => apiClient.get(`/designations/${id}`),
  create: (data) => apiClient.post("/designations", data),
  update: (id, data) => apiClient.put(`/designations/${id}`, data),
  delete: (id) => apiClient.delete(`/designations/${id}`),
};
