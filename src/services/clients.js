import apiClient from "../lib/axios";

export const clientsApi = {
  getAll: (params) => apiClient.get("/clients", { params }),
  getById: (id) => apiClient.get(`/clients/${id}`),
  create: (data) => apiClient.post("/clients", data),
  update: (id, data) => apiClient.put(`/clients/${id}`, data),
  delete: (id) => apiClient.delete(`/clients/${id}`),
  getProjects: (id) => apiClient.get(`/clients/${id}/projects`),
};
