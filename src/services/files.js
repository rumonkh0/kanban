import apiClient from "../lib/axios";

export const uploadFileApi = {
  upload: async ({ formData, onProgress, controller }) => {
    return apiClient.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      signal: controller.signal,
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        if (onProgress) onProgress(percent);
      },
      
    });
  },

  getAll: async (params) => {
    // Assuming /files endpoint can filter by a resource ID via params
    const response = await apiClient.get(`/files`, { params });
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch files");
  },

  getById: async (id) => {
    const response = await apiClient.get(`/files/${id}`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch file");
  },

  // Delete file
  delete: async (id) => {
    const response = await apiClient.delete(`/files/${id}`);

    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to delete client");
  },
};
