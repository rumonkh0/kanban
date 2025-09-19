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

export const usePaidTos = (params) => {
  return useQuery({
    queryKey: ["paidto", params],
    queryFn: () => financeApi.getAllPaidTo(params),
  });
};

export const usePaidTo = (id) => {
  return useQuery({
    queryKey: ["paidto", id],
    queryFn: () => financeApi.getPaidToById(id),
    enabled: !!id,
  });
};

export const useCreatePaidTo = () => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (data) => financeApi.createPaidTo(data),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidto"] });
    },
  });
};

export const useUpdatePaidTo = (id) => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (data) => financeApi.updatePaidTo(id, data),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidto", id] });
      queryFinance.invalidateQueries({ queryKey: ["paidto"] });
    },
  });
};

export const useDeletePaidTo = () => {
  const queryFinance = useQueryClient();

  return useMutation({
    mutationFn: (id) => financeApi.deletePaidTo(id),
    onSuccess: () => {
      queryFinance.invalidateQueries({ queryKey: ["paidto"] });
    },
    onError: (error) => {
      console.error("Error deleting finance record:", error);
    },
  });
};
