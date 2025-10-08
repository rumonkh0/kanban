import React, { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import {
  useDeleteFile,
  useGetAllFiles,
  useUploadFile,
} from "../../../hooks/useFiles";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function Files() {
  const { id } = useParams();
  // const [file, setFile] = useState(null);
  const { mutate } = useUploadFile();
  const [uploads, setUploads] = useState([]);

  const queryClient = useQueryClient();
  const { data: allFiles } = useGetAllFiles({ id });

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) return;

  //   setFile(selectedFile);

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   formData.append("linkedTo", id);

  //   mutate(formData);
  // };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (!selectedFiles.length) return;

    selectedFiles.forEach((file) => {
      const uploadId = Date.now() + Math.random(); // unique id
      const controller = new AbortController();

      // 1. Initial state update (using functional form for safety)
      setUploads((prev) => [
        ...prev,
        { id: uploadId, file, progress: 0, status: "uploading", controller },
      ]);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("linkedTo", id);

      mutate(
        {
          formData,
          controller,
          onProgress: (p) => {
            // 2. Progress update uses functional form
            setUploads((prev) =>
              prev.map((u) => (u.id === uploadId ? { ...u, progress: p } : u))
            );
          },
        },
        {
          onSuccess: () => {
            // 3. SUCCESS: Ensure we filter based on the LATEST 'uploads' state
            setUploads((prev) => prev.filter((u) => u.id !== uploadId));
            queryClient.invalidateQueries({
              queryKey: ["files"],
            });
          },
          onError: (error) => {
            console.log("File Upload Error:", error);
            // We should use the LATEST state to remove the item,
            // otherwise the filter call might be stale.
            toast.error(error.message || "Upload Failed");

            // 4. ERROR: Ensure we filter based on the LATEST 'uploads' state
            setUploads((prev) => prev.filter((u) => u.id !== uploadId));
          },
        }
      );
    });

    event.target.value = null;
  };
  const deleteFile = useDeleteFile();
  // useEffect(() => {
  //   console.log(uploads);
  // }, [uploads]);

  return (
    <div className="bg-surface2 border-2 border-divider rounded-lg p-4">
      <div className="typo-b2 border-b-2 border-divider pb-4 mb-8">Files</div>
      {/* Upload Button */}
      <div className="flex items-center justify-center h-16 bg-surface2 border border-divider rounded-lg relative">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <button type="button" className="flex items-center gap-2 text-text2">
          <Icon name="upload" size={24} />
          <span className="typo-b3">Upload project related Files</span>
        </button>
      </div>
      {/* Progress Bar */}
      <div className="flex flex-wrap gap-2">
        {uploads &&
          uploads.length > 0 &&
          uploads
            .filter((u) => u.progress < 100)
            .map((u) => (
              <div key={u.id} className="mt-4 w-full bg-divider rounded-sm p-2">
                <div
                  className={`h-2 rounded-sm ${
                    u.status === "error"
                      ? "bg-red-500"
                      : u.status === "success"
                      ? "bg-green-500"
                      : "bg-brand"
                  }`}
                  style={{ width: `${u.progress}%` }}
                />
                <div className="flex justify-between mt-1 items-center">
                  <span className="typo-b3 text-text2 truncate">
                    {u.file.name}
                  </span>
                  <span className="typo-b3 text-text2">{u.progress}%</span>
                  {/* {u.status === "uploading" &&
                    {
                       <button
                      onClick={() => {
                        u.controller.abort();
                      }}
                      className="typo-b3 text-red-500 flex items-center gap-1 cursor-pointer"
                    >
                      <Icon name="cross-red" size={16} /> Cancel
                    </button> 
                    }} */}
                </div>
              </div>
            ))}

        {/* {isPending && file && (
          <div className="mt-4 w-full bg-divider rounded-sm h-2 relative">
            <div
              className="bg-brand h-2 rounded-sm"
              style={{ width: `${progress}%` }}
            />
            <div className="flex justify-between mt-1">
              <span className="typo-b3 text-text2">{file.name}</span>
              <span className="typo-b3 text-text2">{progress}%</span>
              <button
                onClick={cancelUpload}
                className="typo-b3 text-red-500 flex items-center gap-1 cursor-pointer"
              >
                <Icon name="cross-red" size={16} /> Cancel
              </button>
            </div>
          </div>
        )} */}
        {/* Uploaded File */}
        {/* {isSuccess && file && !isPending && (
          <div className="mt-4 w-[220px] h-10 bg-divider flex justify-between items-center gap-2 p-2 rounded-sm">
            <Icon name="file" size={20} />
            <div className="typo-b3 text-text flex flex-col truncate">
              <h2 className="truncate">{file.name}</h2>
            </div>
            <Icon
              name="cross-red"
              size={16}
              className="cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        )} */}
        {/* {console.log(allFiles)} */}
        {allFiles &&
          allFiles.length > 0 &&
          allFiles.map((f) => {
            return (
              <div
                key={f._id}
                className="mt-4 w-[220px] h-10 bg-divider flex justify-between items-center gap-2 p-2 rounded-sm"
              >
                <Icon name="file" size={20} />
                <div className="typo-b3 text-text flex flex-col truncate">
                  <h2 className="truncate">{f.originalName}</h2>
                </div>
                <Icon
                  name="cross-red"
                  size={16}
                  className="cursor-pointer min-w-5 min-h-5"
                  onClick={() =>
                    toast.promise(
                      deleteFile.mutateAsync(f._id),
                      {
                        pending: "Deleting File",
                        success: "File Deleted",
                        error: {
                          render({ data }) {
                            const errorMessage =
                              data.response?.data?.message ||
                              data.response?.data?.error ||
                              data.message ||
                              "Failed to delete file.";
                            return errorMessage;
                          },
                        },
                      },
                      { autoClose: 3000 }
                    )
                  }
                />
              </div>
            );
          })}
        {/* Error */}
        {/* {isError && (
          <div className="mt-4 text-red-500 typo-b3">
            Upload failed. Try again.
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Files;
