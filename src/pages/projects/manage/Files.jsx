import React, { useState } from "react";
import Icon from "@/components/Icon";
import {
  useDeleteFile,
  useGetAllFiles,
  useUploadFile,
} from "../../../hooks/useFiles";
import { useParams } from "react-router";
import { toast } from "react-toastify";

function Files() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const { mutate, isLoading, isSuccess, isError, progress, cancelUpload } =
    useUploadFile();

  const { data: allFiles } = useGetAllFiles({ id });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("linkedTo", id);

    mutate(formData);
  };

  const deleteFile = useDeleteFile();

  return (
    <div className="bg-surface2 border-2 border-divider rounded-lg p-4">
      <div className="typo-b2 border-b-2 border-divider pb-4 mb-8">Files</div>
      {/* Upload Button */}
      <div className="flex items-center justify-center h-16 bg-surface2 border border-divider rounded-lg relative">
        <input
          type="file"
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
        {isLoading && file && (
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
                className="typo-b3 text-red-500 flex items-center gap-1"
              >
                <Icon name="cross-red" size={16} /> Cancel
              </button>
            </div>
          </div>
        )}
        {/* Uploaded File */}
        {isSuccess && file && !isLoading && (
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
        )}
        {/* {isSuccess && file && !isLoading && (
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
                  className="cursor-pointer"
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
        {isError && (
          <div className="mt-4 text-red-500 typo-b3">
            Upload failed. Try again.
          </div>
        )}
      </div>
    </div>
  );
}

export default Files;
