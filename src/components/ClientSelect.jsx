"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { RedButton } from "./Component";
import { Link } from "react-router";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

export default function ClientSelect({
  clients = [],
  value, // id or array of ids
  onChange, // setter
  label,
  className,
  required,
  mode = "single", // "single" | "multi"
  addingTitle = "Add new client",
  linkTo = "/admin/clients/add-client",
  placeHolder = "Select Client...",
  disabled = false,
  addButton = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (client) => {
    if (mode === "single") {
      onChange?.(client.id);
      setIsOpen(false);
    } else {
      const selectedIds = value || [];
      if (selectedIds.includes(client.id)) {
        onChange?.(selectedIds.filter((id) => id !== client.id));
      } else {
        onChange?.([...selectedIds, client.id]);
      }
    }
  };

  const isSelected = (client) => {
    if (mode === "single") return value === client.id;
    return value?.includes(client.id);
  };

  // Find the selected client objects for display
  const selectedClients =
    mode === "single"
      ? clients.find((c) => c.id === value)
      : clients.filter((c) => value?.includes(c.id));

  return (
    <div ref={dropdownRef} className={`${className} relative`}>
      {label && (
        <label className="typo-b2 text-text2 block mb-2">
          {label} {required && <span className="text-brand">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          !disabled && setIsOpen(!isOpen);
        }}
        className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand"
      >
        {mode === "single" ? (
          selectedClients ? (
            <div className="flex items-center gap-2">
              <img
                src={
                  selectedClients?.profilePicture
                    ? `${baseURL}/${selectedClients.profilePicture.filePath}`
                    : "/images/profile.png"
                }
                alt={selectedClients.name}
                width={32}
                height={32}
                title={selectedClients.name}
                className="rounded-full  w-8 h-8 object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="text-text">{selectedClients.name}</span>
                <span className="typo-b3 text-text2">
                  {selectedClients.email}
                </span>
              </div>
            </div>
          ) : (
            <span className="typo-b3 text-text2">{placeHolder}</span>
          )
        ) : selectedClients.length > 0 ? (
          <div className="flex -space-x-3">
            {selectedClients.map((client, idx) => (
              <img
                key={idx}
                src={
                  client?.profilePicture
                    ? `${baseURL}/${client.profilePicture.filePath}`
                    : "/images/profile.png"
                }
                alt={client.name}
                width={32}
                height={32}
                title={client.name}
                className="rounded-full border-2 border-white   w-8 h-8 object-cover"
              />
            ))}
          </div>
        ) : (
          <span className="typo-b3 text-text2">{placeHolder}</span>
        )}

        <Icon
          name="arrow"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-divider border-2 border-text2 rounded-lg shadow-lg z-50">
          {/* <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search client..."
                className="w-full h-10 bg-surface2 border border-divider rounded-lg pl-10 pr-4 typo-b3 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <Icon
                name="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text2"
              />
            </div>
          </div> */}

          <div className="max-h-90 overflow-y-auto">
            {clients.map((client, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(client);
                }}
                className={`w-full h-16 p-2 flex items-center gap-2 rounded-lg hover:bg-brand transition-colors group ${
                  isSelected(client) ? "bg-brand/30" : ""
                }`}
              >
                <img
                  src={
                    client?.profilePicture
                      ? `${baseURL}/${client.profilePicture.filePath}`
                      : "/images/profile.png"
                  }
                  alt={client.name}
                  width={40}
                  height={40}
                  title={client.name}
                  className="rounded-full   w-10 h-10 object-cover"
                />
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-text">{client.name}</span>
                  <span className="typo-b3 text-text2 group-hover:text-text">
                    {client.email}
                  </span>
                </div>
              </button>
            ))}
            {addButton && (
              <div className="w-full h-16 flex justify-center items-center">
                <Link to={linkTo}>
                  <RedButton
                    type="button"
                    // onClick={(e) => {
                    //   e.preventDefault(); /* Handle add new client */
                    // }}
                    className="flex items-center px-4"
                  >
                    <Icon name="plus" size={16} className="mr-2" />
                    <span className="typo-b2">{addingTitle}</span>
                  </RedButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search client..."
                className="w-full h-10 bg-surface2 border border-divider rounded-lg pl-10 pr-4 typo-b3 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <Icon
                name="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text2"
              />
            </div>
          </div> */
}
