// departments.js
import apiClient from "../lib/axios";

export const departmentsApi = {
  getAll: (params) => apiClient.get("/departments", { params }),
  getById: (id) => apiClient.get(`/departments/${id}`),
  create: (data) => apiClient.post("/departments", data),
  update: (id, data) => apiClient.put(`/departments/${id}`, data),
  delete: (id) => apiClient.delete(`/departments/${id}`),
};
