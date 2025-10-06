import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notification";

export const useGetNotifications = (params) => {
  return useQuery({
    queryKey: ["notifications", "list", params],
    queryFn: () => notificationApi.getNotifications(params),
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationApi.markAsRead(id),
    onSuccess: () => {
      // Invalidate the main notification list to fetch updated read status
      queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      // Invalidate the main notification list
      queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      // Invalidate the main notification list to remove the deleted item
      queryClient.invalidateQueries({ queryKey: ["notifications", "list"] });
    },
  });
};
