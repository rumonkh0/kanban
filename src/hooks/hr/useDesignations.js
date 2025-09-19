import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { designationsApi } from "../services/hr/designations";

export const useDesignations = (params) => {
  return useQuery({
    queryKey: ["designations", params],
    queryFn: () => designationsApi.getAll(params),
  });
};

export const useDesignation = (id) => {
  return useQuery({
    queryKey: ["designations", id],
    queryFn: () => designationsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => designationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};

export const useUpdateDesignation = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => designationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations", id] });
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};

export const useDeleteDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => designationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};
