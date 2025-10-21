import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentsApi } from "../../services/hr/departments";
import { useNavigate } from "react-router";

export const useDepartments = (params) => {
  return useQuery({
    queryKey: ["departments", params],
    queryFn: () => departmentsApi.getAll(params),
  });
};

export const useDepartment = (id) => {
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => departmentsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => departmentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => departmentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments", id] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      navigate("/departments");
    },
  });
};

export const useDeleteDepartment = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id) => departmentsApi.delete(id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["departments"] });
      navigate("/admin/hr/departments");
    },
    onError: (err) => {
      alert(err.message || "Failed to delete client");
    },
  });
};
