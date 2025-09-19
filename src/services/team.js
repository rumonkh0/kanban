import apiClient from "../lib/axios";

export const teamApi = {
  getAll: (params) => apiClient.get("/team-members", { params }),

  getById: (id) => apiClient.get(`/team-members/${id}`),

  create: (data) => apiClient.post("/team-members", data),

  update: (id, data) => apiClient.put(`/team-members/${id}`, data),

  delete: (id) => apiClient.delete(`/team-members/${id}`),

  getDepartments: () => apiClient.get("/departments"),

  getRoles: () => apiClient.get("/roles"),

  getAppreciations: () => apiClient.get("/appreciations"),
};
