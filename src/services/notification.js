import apiClient from "../lib/axios";

export const notificationApi = {
  getNotifications: async (params) => {
    const response = await apiClient.get(`/notifications`, { params });
    // Assuming your list data is directly in response.data.data
    return response.data.data;
  },

  markAllAsRead: async () => {
    // PUT requests often send an empty body if the action is implied by the URL
    const response = await apiClient.put(`/notifications/mark-all-read`, {});
    return response.data;
  },

  markAsRead: async (id) => {
    // PUT requests often send an empty body if the action is implied by the URL
    const response = await apiClient.put(`/notifications/${id}`, {});
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  },
};
