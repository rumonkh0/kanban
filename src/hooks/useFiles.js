import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { uploadFileApi } from "../services/files";
// import axios from "axios";
// import { useRef } from "react";

export const useUploadFile = () => {
  // const queryClient = useQueryClient();
  // const [progress, setProgress] = useState(0);
  // const cancelToken = useRef(null);

  const mutation = useMutation({
    mutationFn: ({ formData, onProgress, controller }) => {
      // cancelToken.current = axios.CancelToken.source();
      return uploadFileApi.upload({
        formData,
        onProgress: onProgress,
        controller,
        // cancelToken: cancelToken.current.token,
      });
    }
  });

  // const cancelUpload = () => {
  //   if (cancelToken.current) {
  //     cancelToken.current.cancel("User cancelled upload");
  //   }
  //   mutation.reset();
  // };

  return {
    ...mutation,
    // cancelUpload,
  };
};
// ✅ Hook for fetching all files (with optional filters)
export const useGetAllFiles = (params = {}) => {
  return useQuery({
    queryKey: ["files", params], // cache key with params
    queryFn: () => uploadFileApi.getAll(params),
    keepPreviousData: true, // keeps old data while fetching new
    staleTime: 1000 * 60, // cache fresh for 1 min
  });
};

// ✅ Hook for fetching single file by ID
export const useGetFileById = (id) => {
  return useQuery({
    queryKey: ["file", id],
    queryFn: () => uploadFileApi.getById(id),
    enabled: !!id, // only fetch if id is provided
    staleTime: 1000 * 60,
  });
};
export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => uploadFileApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (error) => {
      console.error("Error deleting File:", error);
    },
  });
};
