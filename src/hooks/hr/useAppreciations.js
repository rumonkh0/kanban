import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appreciationAPI } from "../../services/appreciation";

export const useAppreciations = (params) => {
  return useQuery({
    queryKey: ["appreciations", params],
    queryFn: () => appreciationAPI.getAll(params),
  });
};

export const useAppreciation = (id) => {
  return useQuery({
    queryKey: ["appreciations", id],
    queryFn: () => appreciationAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateAppreciation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => appreciationAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};

export const useUpdateAppreciation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => appreciationAPI.update(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["appreciations", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};

export const useDeleteAppreciation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => appreciationAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appreciations"] });
    },
  });
};
