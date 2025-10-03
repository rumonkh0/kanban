import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteAPI } from "../services/notes"; 
// GET ALL Notes (List)
export const useNotes = (params) => {
  return useQuery({
    queryKey: ["notes", params],
    queryFn: () => noteAPI.getAll(params),
  });
};

// GET Single Note
export const useNote = (id) => {
  return useQuery({
    queryKey: ["note", id],
    queryFn: () => noteAPI.getById(id),
    enabled: !!id,
  });
};

// CREATE Note
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => noteAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

// UPDATE Note
export const useUpdateNote = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => noteAPI.update({ id, data }),
    onSuccess: () => {
      // Invalidate the specific note and the general list
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

// DELETE Note
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => noteAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });
};
