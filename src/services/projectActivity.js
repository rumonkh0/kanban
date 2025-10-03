import apiClient from "../lib/axios";

export const projectActivityAPI = {
  getAll: async (params) => {
    const response = await apiClient.get(`/projectactivity`, { params });
    return response.data.data;
  },
  // Get single note
//   getById: async (id) => {
//     const response = await apiClient.get(`/projectactivity/${id}`);
//     return response.data.data;
//   },

//   // Create new note
//   create: async (data) => {
//     const response = await apiClient.post("/projectactivity", data);
//     return response.data.data;
//   },

//   // Update note
//   update: async ({ id, data }) => {
//     const response = await apiClient.put(`/projectactivity/${id}`, data);
//     return response.data.data;
//   },

//   // Delete note
//   delete: async (id) => {
//     const response = await apiClient.delete(`/projectactivity/${id}`);
//     return response.data.data;
//   },
};
