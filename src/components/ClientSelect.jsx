"use client";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { RedButton } from "./Component";

export default function ClientSelect({ onSelect, label, className, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Example clients - you would typically fetch this from your backend
  const clients = [
    {
      id: 1,
      name: "Gustave Koelpin",
      email: "@example",
      avatar: "/images/profile.png",
    },
    {
      id: 1,
      name: "jhon Koelpin",
      email: "@example",
      avatar: "/images/profile.png",
    },
  ];

  const handleSelect = (client) => {
    setSelectedClient(client);
    setIsOpen(false);
    if (onSelect) onSelect(client);
  };

  return (
    <div className={`${className} relative`}>
      {label && (
        <label className="typo-b2 text-text2 block mb-2">
          {label} {required && <span className="text-brand">*</span>}
        </label>
      )}

      {/* Selected Client Display / Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand"
      >
        {selectedClient ? (
          <div className="flex items-center gap-2">
            <Image
              src={selectedClient.avatar}
              alt={selectedClient.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <span className="text-text">{selectedClient.name}</span>
              <span className="typo-b3 text-text2">{selectedClient.email}</span>
            </div>
          </div>
        ) : (
          <span className="typo-b3 text-text2">Select Client</span>
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
                className="w-full h-16 p-2 flex items-center gap-2 rounded-lg hover:bg-brand transition-colors group"
              >
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-text">{client.name}</span>
                  <span className="typo-b3 text-text2 group-hover:text-text">
                    {client.email}
                  </span>
                </div>
              </button>
            ))}
            <div className="w-full h-16 flex justify-center items-center">
              <RedButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  /* Handle add new client */
                }}
                className="flex items-center gap-"
              >
                <Icon name="plus" size={16} className="mr-2" />
                <span className="typo-b2">Add New Client</span>
              </RedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
