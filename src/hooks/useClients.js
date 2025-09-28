import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsApi } from "../services/clients";
import { useNavigate } from "react-router";

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

export const useClientDetails = (id) => {
  return useQuery({
    queryKey: ["clientsDetails", id],
    queryFn: () => clientsApi.getClientDetailsById(id),
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => clientsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients", id] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate("/clients");
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => clientsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      console.error("Error deleting client:", error);
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
