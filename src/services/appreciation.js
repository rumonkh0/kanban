import apiClient from "../lib/axios";

export const appreciationAPI = {
  // Get all appreciations
  getAll: async (params) => {
    // GET /api/appreciations?param1=value1
    const response = await apiClient.get(`/appreciations`, { params });
    return response.data.data;
  },

  // Get single appreciation
  getById: async (id) => {
    // GET /api/appreciations/:id
    const response = await apiClient.get(`/appreciations/${id}`);
    return response.data.data;
  },

  // Create new appreciation
  create: async (data) => {
    // POST /api/appreciations
    const response = await apiClient.post("/appreciations", data);
    return response.data.data;
  },

  // Update appreciation
  update: async ({ id, data }) => {
    // PUT /api/appreciations/:id
    const response = await apiClient.put(`/appreciations/${id}`, data);
    return response.data.data;
  },

  // Delete appreciation
  delete: async (id) => {
    // DELETE /api/appreciations/:id
    const response = await apiClient.delete(`/appreciations/${id}`);
    return response.data.data;
  },
};
