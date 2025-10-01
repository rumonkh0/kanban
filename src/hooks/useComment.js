import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "../services/comments";

export const useComments = (taskId) => {
  return useQuery({
    queryKey: ["comments", { taskId }],
    queryFn: () => commentsApi.getAll(taskId),
    enabled: !!taskId,
  });
};

export const useComment = (id) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateComment = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => commentsApi.create(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", { taskId }] });
    },
  });
};

export const useUpdateComment = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => commentsApi.update(id, data),
    onSuccess: (updatedComment) => {
      queryClient.invalidateQueries({ queryKey: ["comments", { taskId }] });

      queryClient.setQueryData(["comments", updatedComment.id], updatedComment);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => commentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });
};
