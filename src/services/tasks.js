import apiClient from "../lib/axios";

export const tasksApi = {
  getAll: (params) => apiClient.get("/tasks", { params }),

  getById: (id) => apiClient.get(`/tasks/${id}`),

  create: (data) => apiClient.post("/tasks", data),

  update: (id, data) => apiClient.put(`/tasks/${id}`, data),

  delete: (id) => apiClient.delete(`/tasks/${id}`),

  updateStatus: (id, status) =>
    apiClient.patch(`/tasks/${id}/status`, { status }),

  assignMember: (id, memberId) =>
    apiClient.post(`/tasks/${id}/assign`, { memberId }),
};
