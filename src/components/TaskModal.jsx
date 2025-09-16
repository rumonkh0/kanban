"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { RedButton, Dropdown, ImageName } from "./Component";
import DropdownMenu from "@/components/DropdownMenu";
import ClientSelect from "./ClientSelect";

function TaskModal({ role = "member", task = {} }) {
  const [openImage, setOpenImage] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    impact: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const imageRef = useRef(null);
  const menuItems = [
    { label: "Copy", onClick: () => console.log("Copy clicked") },
    {
      label: "Edit",
      onClick: () => console.log("Edit clicked"),
    },
    {
      label: "Share",
      onClick: () => console.log("Share clicked"),
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
    },
  ];
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

  return (
    <div className="w-200 bg-surface border-2 border-divider rounded-lg">
      {/* Header */}
      <div className="h-25 bg-gray-400 rounded-t-lg flex justify-between items-start">
        <div className="flex justify-between items-center typo-b2 text-black p-2">
          <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-400"></div>
          Task 1
        </div>
        {role !== "client" && (
          <div className="flex gap-4 p-4">
            {/* Image Icon Dropdown */}
            <div className="relative" ref={imageRef}>
              <div onClick={() => setOpenImage(!openImage)}>
                <Icon name="image" className="cursor-pointer" />
              </div>
              {/* Dropdown */}
              {openImage && (
                <div className="absolute top-full right-0 mt-1 w-auto min-w-max p-2 bg-divider rounded shadow cursor-default z-50">
                  <h2 className="typo-b2 mb-2">Add Cover Image</h2>
                  <div className="flex gap-2 flex-wrap">
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2"></div>
                    <div className="h-12 w-12 rounded-sm bg-text2 flex justify-center items-center">
                      <Icon name="plus" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Icon Dropdown */}
            <div className="relative">
              <div onClick={() => setOpenMenu(!openMenu)}>
                <Icon name="menu-black" className="cursor-pointer" />
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
      <div className="p-2">
        <input
          className="w-full h-10 border-2 border-divider rounded-sm flex items-center px-4 typo-b2 text-text"
          placeholder="Task 2"
        />

        {/* Main Content Row */}
        <div className="mt-2 flex items-stretch h-[288px]">
          {/* Left Column */}
          {role === "admin" ? (
            <div className="flex-1 pr-2 border-r-2 border-divider flex flex-col gap-2">
              <div className="flex gap-2">
                <Dropdown
                  options={[
                    "Sample projec 1",
                    "Sample projec 2",
                    "Sample projec 3",
                    "Sample projec 4",
                  ]}
                  value={formData.project}
                  onChange={(val) => handleChange("project", val)}
                  className="flex-1"
                />
                {/* <div className="flex-1 relative">
                  <select className="w-full h-12 bg-surface2 border border-divider rounded-sm px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand typo-b3">
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                    <option>Dr.</option>
                  </select>
                  <Icon
                    name="arrow"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div> */}
                <ClientSelect
                  onSelect={(member) => console.log("Member selected:", member)}
                  className="flex-1 typo-b3"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="date"
                    placeholder="Select Date"
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    placeholder="Select Date"
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-50 ${
                      formData.impact === "High"
                        ? "bg-success"
                        : formData.impact === "Low"
                        ? "bg-brand"
                        : formData.impact === "Medium"
                        ? "bg-[#A88AED]"
                        : ""
                    }`}
                  ></div>
                  <Dropdown
                    options={["High", "Low", "Medium"]}
                    value={formData.impact}
                    onChange={(val) => handleChange("impact", val)}
                    className="pl-8"
                  />
                </div>
                <div className="flex-1 flex items-center justify-center h-12 bg-surface2 border border-divider rounded-lg">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-text2"
                  >
                    <Icon name="upload" size={16} />
                    <span className="typo-b3">Upload File Here</span>
                  </button>
                </div>
              </div>
              <textarea
                placeholder="Type desc here"
                className="h-30 p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm"
              ></textarea>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4 pr-2 pt-2 border-r-2 border-divider">
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
                      task.priority === "High"
                        ? "bg-success"
                        : task.priority === "Low"
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
                          task.priority === "High"
                            ? "bg-success"
                            : task.priority === "Low"
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

          {/* Right Column */}
          <div className="flex-1 pl-2 flex flex-col min-h-0">
            {/* Top: Comments */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="chat" />
                Comments and activity
              </div>

              <div className="typo-b3 text-text2">
                <div className="flex items-center gap-1">
                  <img
                    src="/images/profile.png"
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover inline-block"
                  />
                  <div className="text-text">John Doe</div>
                </div>
                <div className="ml-9">
                  <div className="bg-divider rounded-sm p-3 pl-1 mb-1 flex items-center">
                    comment
                  </div>
                  <div className="flex justify-between">
                    <div>33s ago</div>
                    <div className="flex gap-2">
                      <div className="border-b border-text2 cursor-pointer">
                        Edit
                      </div>
                      <div className="border-b border-text2 cursor-pointer">
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Input Bar */}
            <div className="mt-auto h-10 flex">
              <input
                placeholder="Write a comment"
                className="flex-1 typo-b3 flex items-center pl-4 bg-divider rounded-l-sm"
              ></input>
              <RedButton className="px-2 rounded-l-none">
                <Icon name="send" />
              </RedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const InfoItem = ({ label, value, children }) => (
  <div className="flex items-start  gap-2">
    <span className="typo-b2 text-text2 w-40">{label}</span>
    <span className={`flex-1 flex items-center typo-b2`}>
      : &nbsp; {value ?? children}
    </span>
  </div>
);
const MenuButton = ({ label }) => (
  <button className="w-full text-center h-8.5 text-text2 rounded-sm hover:bg-brand hover:text-text cursor-pointer">
    {label}
  </button>
);

export default TaskModal;
