import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsApi } from "../services/clients";

export const useClients = (params) => {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => clientsApi.getAll(params),
  });
};

export const useClient = (id) => {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => clientsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useUpdateClient = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => clientsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients", id] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useClientProjects = (id) => {
  return useQuery({
    queryKey: ["clients", id, "projects"],
    queryFn: () => clientsApi.getProjects(id),
    enabled: !!id,
  });
};
