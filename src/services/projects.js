import apiClient from "../lib/axios";

export const projectsApi = {
  getAll: (params) => apiClient.get("/projects", { params }),

  getById: (id) => apiClient.get(`/projects/${id}`),

  create: (data) => apiClient.post("/projects", data),

  update: (id, data) => apiClient.put(`/projects/${id}`, data),

  delete: (id) => apiClient.delete(`/projects/${id}`),

  addMember: (id, data) => apiClient.post(`/projects/${id}/members`, data),

  getMembers: (id) => apiClient.get(`/projects/${id}/members`),

  updateMember: (id, data) => apiClient.put(`/projects/${id}/members`, data),

  removeMember: (projectId, memberId) =>
    apiClient.delete(`/projects/${projectId}/members/${memberId}`),

  getTasks: (id) => apiClient.get(`/projects/${id}/tasks`),

  getNotes: (id) => apiClient.get(`/projects/${id}/notes`),

  getActivity: (id) => apiClient.get(`/projects/${id}/activity`),
};
