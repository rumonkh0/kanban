import apiClient from "../lib/axios";

export const appreciationsApi = {
  getAll: (params) => apiClient.get("/appreciations", { params }),
  getById: (id) => apiClient.get(`/appreciations/${id}`),
  create: (data) => apiClient.post("/appreciations", data),
  update: (id, data) => apiClient.put(`/appreciations/${id}`, data),
  delete: (id) => apiClient.delete(`/appreciations/${id}`)
};