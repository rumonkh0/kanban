import apiClient from "../lib/axios";

export const projectMembersApi = {
  // Get all members of a project
  getAll: async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/members`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch project members");
  },

  // Add a new member to a project
  add: async (projectId, data) => {
    const response = await apiClient.post(`/projects/${projectId}/members`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to add project member");
  },

  // Update a member in a project
  update: async (projectId, memberId, data) => {
    const response = await apiClient.put(`/projects/${projectId}/members/${memberId}`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update project member");
  },

  // Remove a member from a project
  remove: async (projectId, memberId) => {
    const response = await apiClient.delete(`/projects/${projectId}/members/${memberId}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to remove project member");
  },
};
