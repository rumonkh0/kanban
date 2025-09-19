import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeApi } from "../services/finance";

export const usePaidFroms = (params) => {
  return useQuery({
    queryKey: ["paidfrom", params],
    queryFn: () => financeApi.getAllPaidFrom(params),
  });
};

export const usePaidFrom = (id) => {
  return useQuery({
    queryKey: ["paidfrom", id],
    queryFn: () => financeApi.getPaidFromById(id),
    enabled: !!id,
  });
};

export const useCreatePaidFrom = () => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (data) => financeApi.createPaidFrom(data),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidfrom"] });
    },
  });
};

export const useUpdatePaidFrom = (id) => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (data) => financeApi.updatePaidFrom(id, data),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidfrom", id] });
      queryFinance.invalidateQueries({ queryKey: ["paidfrom"] });
    },
  });
};

export const useDeletePaidFrom = () => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (id) => financeApi.deletePaidFrom(id),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidfrom"] });
    },
    onError: (error) => {
      console.error("Error deleting finance record:", error);
    },
  });
};
