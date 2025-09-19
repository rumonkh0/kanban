import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appreciationsApi } from "../services/hr/appreciations";

export const useAppreciations = (params) => {
  return useQuery({
    queryKey: ["appreciations", params],
    queryFn: () => appreciationsApi.getAll(params),
  });
};

export const useAppreciation = (id) => {
  return useQuery({
    queryKey: ["appreciations", id],
    queryFn: () => appreciationsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateAppreciation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => appreciationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};

export const useUpdateAppreciation = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => appreciationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appreciations", id] });
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};

export const useDeleteAppreciation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => appreciationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};