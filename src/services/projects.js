import apiClient from "../lib/axios";

export const projectsApi = {
  // Get all projects
  getAll: async (params) => {
    const response = await apiClient.get("/projects", { params });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch projects");
  },

  // getTrackers: async (params) => {
  //   const response = await apiClient.get("/projects", { params });
  //   if (response.data?.success) return response.data.data;
  //   throw new Error(response.data?.message || "Failed to fetch projects");
  // },

  // Get single project
  getById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch project");
  },

  // Get single project
  getDetails: async (id) => {
    const response = await apiClient.get(`/projects/${id}/details`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch project");
  },

  // Create new project
  create: async (data) => {
    const response = await apiClient.post("/projects", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to create project");
  },

  // Update project
  update: async (id, data) => {
    // console.log(id, data);
    const response = await apiClient.put(`/projects/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update project");
  },

  // Delete project
  delete: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete project");
  },

  // Add member to project
  addMember: async (id, data) => {
    const response = await apiClient.post(
      `/projects/${id}/projectmembers`,
      data
    );
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to add member");
  },

  // Get project members
  getMembers: async (id) => {
    const response = await apiClient.get(`/projects/${id}/projectmembers`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch members");
  },

  // Update project member
  updateMember: async (id, data) => {
    const response = await apiClient.put(
      `/projects/${id}/projectmembers`,
      data
    );
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to update member");
  },

  // Remove member from project
  removeMember: async (projectId, memberId) => {
    const response = await apiClient.delete(
      `/projects/${projectId}/projectmembers/${memberId}`
    );
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to remove member");
  },

  getActivity: async (projectId) => {
    const response = await apiClient.get(
      `/projectactivity/project/${projectId}`
    );
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to remove member");
  },
};
