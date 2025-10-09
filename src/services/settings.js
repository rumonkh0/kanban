import apiClient from "../lib/axios";

export const settingsAPI = {

  getAdminSetting: async () => {
    const response = await apiClient.get(`/settings/admin`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch admin settings");
  },
  editAdminSetting: async (data) => {
    const response = await apiClient.put(`/settings/admin`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to update admin settings"
    );
  },
  getThemeSetting: async () => {
    const response = await apiClient.get(`/settings/theme`);
    if (response.data?.success) return response.data.data;
    throw new Error(response.data?.message || "Failed to fetch theme settings");
  },
  editThemeSetting: async (data) => {
    const response = await apiClient.put(`/settings/theme`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to update theme settings"
    );
  },

  getBusinessAddress: async () => {
    const response = await apiClient.get(`/settings/business-address`);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to fetch business address"
    );
  },
  editBusinessAddress: async (data) => {
    const response = await apiClient.put(`/settings/business-address`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to update business address"
    );
  },

  getCompanySetting: async () => {
    const response = await apiClient.get(`/settings/company`);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to fetch company settings"
    );
  },
  editCompanySetting: async (data) => {
    const response = await apiClient.put(`/settings/company`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to update company settings"
    );
  },

  getSecuritySetting: async () => {
    const response = await apiClient.get(`/settings/security`);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to fetch security settings"
    );
  },
  editSecuritySetting: async (data) => {
    const response = await apiClient.put(`/settings/security`, data);
    if (response.data?.success) return response.data.data;
    throw new Error(
      response.data?.message || "Failed to update security settings"
    );
  },
};
