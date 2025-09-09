"use client";
import AddCardModal from "@/components/AddCardModal";
import { RedButton } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import TaskModal from "@/components/TaskModal";
import { usePageTitle } from "@/context/PageTitleContext";
import React, { useEffect, useState } from "react";

function tasks() {
  const { setTitle } = usePageTitle();
  const [isOpen, setIsOpen] = useState(false);
  const [addCardModal, setaddCardModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
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

  useEffect(() => {
    setTitle("Tasks");
  }, []);
  return (
    <div className="bg-surface2 p-2 rounded-sm border-2 border-divider">
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4 cursor-pointer">
          <div
            onClick={() => setaddCardModal(true)}
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Another Card
          </div>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select match</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select Client</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[290px] bg-surface border-2 border-divider rounded-lg p-2 pt-3  flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-400"></div>
              ToDo
            </div>
            <div className="relative">
              <Icon
                name="menu"
                className="relative cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
              <DropdownMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                menuItems={menuItems}
                className="top-full right-0 mt-1"
              />
            </div>
          </div>
          <div className="h-12 bg-divider rounded-sm flex justify-center items-center gap-2 cursor-pointer">
            <Icon name="plus" size={16} /> Add Task
          </div>
          <div className="p-2 bg-divider rounded-sm flex flex-col justify-center items-center gap-2 cursor-pointer">
            <input
              type="text"
              className="w-full h-8 px-2 typo-b3 rounded-sm bg-surface outline-none"
              placeholder="Task Title"
            />
            <RedButton className="typo-b3">Add Task</RedButton>
          </div>
          <div className="flex flex-col gap-1 p-2 bg-divider rounded-sm justify-center items-center">
            <div>
              <img src="/images/demo.png" className="rounded-lg" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div>Task 1</div>
              <Icon
                name="edit"
                className="cursor-pointer"
                size={20}
                onClick={() => setTaskModal(true)}
              />
            </div>
            <div className="w-full flex justify-between items-end">
              <div className="flex gap-1">
                <Icon name="subject" size={20} />
                <Icon name="chat" size={20} /> 0
                <Icon name="attachment" size={20} />0
                <div className="h-7 p-1 flex items-center gap-1 bg-brand/20 text-brand rounded-xs">
                  <Icon name="calendar-red" /> 2 Days
                </div>
              </div>
              <div className="flex -space-x-3">
                <img
                  src="/images/profile.png"
                  alt="User 1"
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
                <img
                  src="/images/profile.png"
                  alt="User 2"
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[290px] bg-surface border-2 border-divider rounded-lg p-4">
          Box 2
        </div>
        <div className="flex-1 min-w-[290px] bg-surface border-2 border-divider rounded-lg p-4">
          Box 3
        </div>
        <div className="flex-1 min-w-[290px] bg-surface border-2 border-divider rounded-lg p-4">
          Box 4
        </div>
      </div>
      <Modal isOpen={addCardModal} onClose={() => setaddCardModal(false)}>
        <AddCardModal />
      </Modal>
      <Modal isOpen={taskModal} onClose={() => setTaskModal(false)}>
        <TaskModal />
      </Modal>
    </div>
  );
}

export default tasks;
