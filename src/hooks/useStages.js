import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stagesApi } from "../services/stages";

// Fetch all stages
export const useStages = () => {
  return useQuery({
    queryKey: ["stages"],
    queryFn: () => stagesApi.getAll(),
    onError: (error) => {
      console.error("Error fetching stages:", error);
    },
  });
};

// Fetch single stage by ID
export const useStageById = (id) => {
  return useQuery({
    queryKey: ["stages", id],
    queryFn: () => stagesApi.getById(id),
    enabled: !!id,
    onError: (error) => {
      console.error(`Error fetching stage ${id}:`, error);
    },
  });
};

// Create a new stage
export const useCreateStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => stagesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
    },
    onError: (error) => {
      console.error("Error creating stage:", error);
    },
  });
};

// Update a stage
export const useUpdateStage = (id) => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => stagesApi.update(id, data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["stages", id] });
    //   queryClient.invalidateQueries({ queryKey: ["stages"] });
    //   navigate("/stages"); // adjust route if needed
    // },
    onError: (error) => {
      console.error(`Error updating stage ${id}:`, error);
    },
  });
};

export const useUpdateStageOrder = () => {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    // console.log()
    mutationFn: ({id, prev, next}) => stagesApi.updateOrder(id, prev, next),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["stages", id] });
    //   queryClient.invalidateQueries({ queryKey: ["stages"] });
    //   navigate("/stages"); // adjust route if needed
    // },
    onError: (error) => {
      console.error(`Error updating stage:`, error);
    },
  });
};

// Delete a stage
export const useDeleteStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => stagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stages"] });
    },
    onError: (error) => {
      console.error("Error deleting stage:", error);
    },
  });
};
