import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "../services/service";
import { useNavigate } from "react-router";

// Fetch all services
export const useServices = (params) => {
  return useQuery({
    queryKey: ["services", params],
    queryFn: () => servicesApi.getAll(params),
  });
};

// Fetch single service by ID
export const useService = (id) => {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  });
};

// Create new service
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => servicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

// Update existing service
export const useUpdateService = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => servicesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services", id] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      navigate("/services/services");
    },
  });
};

// Delete service
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
    },
  });
};
