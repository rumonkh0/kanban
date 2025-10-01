import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Icon from "./Icon";
import { RedButton, Dropdown, ImageName } from "./Component";
import DropdownMenu from "@/components/DropdownMenu";
import ClientSelect from "./ClientSelect";
import { useTask } from "../hooks/useTasks";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../hooks/useComment";

function TaskModal({ role = "member", id }) {
  const [openImage, setOpenImage] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]); // uploaded images
  const [files, setFiles] = useState([]); // uploaded files
  const { data: taskData, isPending } = useTask(id);

  const [formData, setFormData] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const menuItems = [
    { label: "Copy", onClick: () => console.log("Copy clicked") },
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Share", onClick: () => console.log("Share clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
  ];

  // File upload handler for images
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => [...prev, reader.result]); // store base64
    };
    reader.readAsDataURL(file);
  };
  const handleDeleteImage = (indexToDelete) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };

  // File upload handler for documents
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => [
      ...prev,
      {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
        file: file,
      },
    ]);
  };

  const createComment = useCreateComment(id);
  const { data: taskComments, isPending: commentPending } = useComments(id);

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      createComment.mutate({ content: comment });
      setComment("");
    }
  };
  const deleteComment = useDeleteComment();
  const handleDeleteComment = (id) => {
    deleteComment.mutate(id);
  };

  // Close on outside click for image dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (imageRef.current && !imageRef.current.contains(e.target)) {
        setOpenImage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (taskData) setFormData(taskData);
  }, [taskData]);

  if (isPending) return <div>loading data</div>;

  return (
    <div className="w-full lg:w-200 bg-surface border-2 border-divider rounded-lg">
      {/* Header */}
      <div
        className="h-20 md:h-25 rounded-t-lg flex justify-between items-start bg-gray-400"
        style={
          images[0]
            ? {
                backgroundImage: `url(${images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div className="flex justify-between items-center typo-b2 text-black p-2">
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-400"></div>
          {formData?.title}
        </div>

        {role !== "client" && (
          <div className="flex gap-2 md:gap-4 p-2 md:p-4">
            {/* Image Icon Dropdown */}
            <div className="relative" ref={imageRef}>
              <div onClick={() => setOpenImage(!openImage)}>
                <Icon name="image" size={20} className="cursor-pointer" />
              </div>
              {openImage && (
                <div className="absolute top-full right-0 mt-1 w-auto min-w-max p-2 bg-divider rounded shadow cursor-default z-50">
                  <h2 className="typo-b2 mb-2">Add Cover Image</h2>
                  <div className="flex gap-2 flex-wrap">
                    {images.map((img, idx) => (
                      // Add relative positioning to the wrapper div for absolute delete button
                      <div
                        key={idx}
                        className="h-12 w-12 rounded-sm overflow-hidden relative"
                      >
                        <img
                          src={img}
                          alt={`cover-${idx}`}
                          className="h-full w-full object-cover"
                        />

                        {/* NEW: Delete button for each image */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dropdown from closing if it's the imageRef parent
                            handleDeleteImage(idx);
                          }}
                          className="absolute top-1 right-1 bg-brand text-white rounded-full w-4 h-4 text-xs cursor-pointer"
                          aria-label="Delete image"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {/* Upload Button */}
                    <div
                      className="h-12 w-12 rounded-sm bg-text2 flex justify-center items-center cursor-pointer"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Icon name="plus" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Menu Icon Dropdown */}
            <div className="relative">
              <div onClick={() => setOpenMenu(!openMenu)}>
                <Icon name="menu-black" size={20} className="cursor-pointer" />
              </div>
              <DropdownMenu
                isOpen={openMenu}
                onClose={() => setOpenMenu(false)}
                menuItems={menuItems}
                className="top-full right-0 mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-2 md:p-4 overflow-y-scroll mx-h-[50vh]">
        <input
          className="w-full h-10 border-2 border-divider rounded-sm flex items-center px-2 md:px-4 typo-b2 text-text"
          placeholder="Task 2"
        />

        {/* Main Content Row - Stack on mobile */}
        <div className="mt-2 flex flex-col lg:flex-row items-stretch h-[450px] lg:h-[288px] overflow-y-scroll">
          {/* Left Column */}
          {role === "admin" ? (
            <div className="flex-1 lg:pr-2 pb-2 lg:pb-0 lg:border-r-2 border-b-2 lg:border-b-0 border-divider flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <Dropdown
                  options={[`${formData?.project.projectName}`]}
                  value={formData?.project.projectName}
                  onChange={(val) => handleChange("project", val)}
                />
                <ClientSelect
                  clients={[
                    {
                      id: formData?.project.client._id,
                      name: formData?.project.client.name,
                      profilePicture: formData?.project.client.profilePicture,
                    },
                  ]}
                  value={formData?.project.client._id}
                  onSelect={(member) => console.log("Member selected:", member)}
                  className="flex-1 typo-b3"
                  disabled
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <input
                    type="date"
                    placeholder="Select Date"
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-2 md:px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    placeholder="Select Date"
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-2 md:px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-50 ${
                      formData?.impact === "High"
                        ? "bg-success"
                        : formData?.impact === "Low"
                        ? "bg-brand"
                        : formData?.impact === "Medium"
                        ? "bg-[#A88AED]"
                        : ""
                    }`}
                  ></div>
                  <Dropdown
                    options={["High", "Low", "Medium"]}
                    value={formData?.impact}
                    onChange={(val) => handleChange("impact", val)}
                    className="pl-8 w-full h-12 bg-surface2 rounded-lg border-divider"
                  />
                </div>
                <div className="flex-1 flex items-center justify-center bg-surface2 border border-divider rounded-lg">
                  <button
                    type="button"
                    onClick={() => documentInputRef.current.click()}
                    className="flex items-center gap-2 text-text2 h-12"
                  >
                    <Icon name="upload" size={16} />
                    <span className="typo-b3">Upload File Here</span>
                  </button>
                  <input
                    type="file"
                    ref={documentInputRef}
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                </div>
              </div>
              {/* Show uploaded files */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-surface2 border border-divider rounded-lg px-2 py-1"
                    >
                      <Icon name="file" size={20} />
                      <span className="typo-b3 text-text">{file.name}</span>
                      <button
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== idx))
                        }
                        className="text-brand"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <textarea
                placeholder="Type desc here"
                className="h-24 md:h-30 p-2 md:p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm"
              ></textarea>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2 md:gap-4 lg:pr-2 pb-2 lg:pb-0 pt-2 lg:border-r-2 border-b-2 lg:border-b-0 border-divider">
              <InfoItem label="Project" value="Sample project one" />
              {role === "member" && (
                <InfoItem label="Assigned Member">
                  <ImageName
                    image="/images/profile.png"
                    username="Safin Hossen"
                  />
                </InfoItem>
              )}
              <InfoItem label="Create Date" value="Aug 20, 2025" />
              <InfoItem label="Due Date" value="Aug 20, 2025" />
              <InfoItem label="Priority">
                <>
                  <div
                    className={`w-2 h-2 mr-2 rounded-full ${
                      formData?.priority === "High"
                        ? "bg-success"
                        : formData?.priority === "Low"
                        ? "bg-brand"
                        : "bg-[#A88AED]"
                    }`}
                  ></div>{" "}
                  High
                </>
              </InfoItem>
              {role === "member" && (
                <InfoItem label="Related File">
                  <div className="h-10 flex justify-between items-center gap-1 rounded-sm">
                    <Icon name="file" size={40} />
                    <div className="typo-b3 text-text flex flex-col">
                      <h2 className="text-success underline typo-b2 pb-2 cursor-pointer">
                        Download
                      </h2>
                      <p className="cursor-pointer">view</p>
                    </div>
                  </div>
                </InfoItem>
              )}
              {role === "client" && (
                <>
                  <InfoItem label="Last Update" value="Aug 20, 2025" />
                  <InfoItem label="Current Stage">
                    <>
                      <div
                        className={`w-2 h-2 mr-2 rounded-full ${
                          formData?.priority === "High"
                            ? "bg-success"
                            : formData?.priority === "Low"
                            ? "bg-brand"
                            : "bg-[#A88AED]"
                        }`}
                      ></div>
                      High
                    </>
                  </InfoItem>
                </>
              )}
              {role === "member" && (
                <p className="text-brand underline typo-b2 cursor-pointer">
                  Leave Task
                </p>
              )}
            </div>
          )}

          {/* Right Column - Comments */}
          <div className="flex-1 lg:pl-2 pt-2 lg:pt-0 flex flex-col min-h-[200px] lg:min-h-0">
            {/* Top: Comments */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="chat" size={20} />
                <span className="typo-b2">Comments and activity</span>
              </div>

              {commentPending ? (
                <div>Loading comments</div>
              ) : taskComments?.length > 0 ? (
                taskComments.map((comment) => (
                  <div className="typo-b3 text-text2">
                    <div className="flex items-center gap-1">
                      <img
                        src="/images/profile.png"
                        alt="profile"
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover inline-block"
                      />
                      <div className="text-text typo-b2">
                        {comment.author.profile.name}
                      </div>
                    </div>
                    <div className="ml-7 md:ml-9">
                      <div className="bg-divider rounded-sm p-2 md:p-3 pl-1 mb-1 flex items-center">
                        {comment.content}
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <div>{moment(comment.createdAt).fromNow()}</div>
                        <div className="flex gap-2">
                          {/* <div className="border-b border-text2 cursor-pointer">
                            Edit
                          </div> */}
                          <div
                            onClick={() => handleDeleteComment(comment._id)}
                            className="border-b border-text2 cursor-pointer"
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No comments here</div>
              )}
            </div>

            {/* Bottom Input Bar */}
            <form onSubmit={handleComment} className="mt-auto h-10 flex">
              <input
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 typo-b3 flex items-center pl-2 md:pl-4 bg-divider rounded-l-sm outline-none"
              ></input>
              <RedButton type="submit" className="px-2 rounded-l-none">
                <Icon name="send" size={16} />
              </RedButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
    <span className="typo-b2 text-text2 sm:w-32 md:w-40">{label}</span>
    <span className="flex-1 flex items-center typo-b2">
      <span className="hidden sm:inline">: &nbsp;</span>
      {value ?? children}
    </span>
  </div>
);

export default TaskModal;
