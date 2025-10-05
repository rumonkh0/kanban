import React, { useState } from "react";
import { Link } from "react-router";
import Icon from "@/components/Icon";
import { FormatDate, Table, Td, Th, Thead } from "./Component";
import { useTasks } from "../hooks/useTasks";
import Modal from "./Modal";
import TaskModal from "./TaskModal";
import DropdownMenu from "./DropdownMenu";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function ClientTable() {
  const { data: tasks, isPending } = useTasks();
  const [activeMenu, setActiveMenu] = useState(null);
  const [taskModal, setTaskModal] = useState(false);

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const [currentId, setCurrentId] = useState(null);
  if (isPending) return <div>Loading tasks...</div>;
  return (
    <Table>
      <Thead>
        <tr className="text-left">
          <Th title="Project ID" />
          <Th title="Task" />
          <Th title="Start Date" />
          <Th title="Due Date" />
          <Th title="Assigned To" />
          {/* <Th title="Hours Logged" /> */}
          <Th title="Status" />
          <Th title="Action" />
        </tr>
      </Thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr
            key={index}
            className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
          >
            {/* Client Name with Avatar */}
            <Td
              className="first:rounded-l-[4px]"
              data={task.project.shortCode}
            />
            <Td>
              <div>
                <div className="flex gap-4 w-fit">
                  <div>{task.stage.title}</div>
                  <div className="typo-b3 border border-text2 rounded-sm flex items-center gap-2 px-2.5">
                    <p
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "High"
                          ? "bg-success"
                          : task?.priority === "Low"
                          ? "bg-brand"
                          : task?.priority === "Medium"
                          ? "bg-[#A88AED]"
                          : ""
                      }`}
                    ></p>
                    {task.priority}
                  </div>
                </div>
                <div className="typo-b3">{task.project.projectName}</div>
              </div>
            </Td>
            <Td data={FormatDate(task.startDate)} />
            <Td data={FormatDate(task.endDate)} className="text-brand" />
            <Td>
              {task.members && task.members.length > 0 ? (
                <div className="flex -space-x-3">
                  {task.members.map((m, idx) => {
                    const image = m.profilePicture
                      ? `${baseURL}/${m.profilePicture.filePath}`
                      : "/images/profile.png";
                    return (
                      <img
                        key={m.id || idx}
                        src={image || "/images/profile.png"}
                        // alt={m.name || "User"}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="typo-b3">No members</p>
              )}
            </Td>
            {/* <Td data={`null`} /> */}
            <Td>
              <div className="w-31 h-10 flex items-center justify-center gap-2 border border-text2 rounded-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.status === "Completed" ? "bg-success" : "bg-blue-500"
                  }`}
                ></div>
                <div className="typo-b3">{task.status}</div>
                <div>
                  <Icon name="arrow" />
                </div>
              </div>
            </Td>
            <Td className="text-left last:rounded-r-[4px]">
              <button
                onClick={(e) => handleMenuClick(index, e)}
                className="relative p-2 cursor-pointer hover:bg-surface2/60 border border-text2 rounded-sm"
              >
                <Icon name="menu" size={20} />
                <DropdownMenu
                  isOpen={activeMenu === index}
                  onClose={() => setActiveMenu(null)}
                  menuItems={[
                    {
                      label: "View",
                      onClick: () => {
                        setCurrentId(task._id);
                        setTaskModal(true);
                      },
                    },
                    {
                      label: "Delete",
                      // onClick: () => handleDelete(teamMember._id),
                    },
                  ]}
                />
              </button>
            </Td>
          </tr>
        ))}
      </tbody>
      <Modal isOpen={taskModal} onClose={() => setTaskModal(false)}>
        <TaskModal
          role="admin"
          id={currentId}
          onClose={() => setTaskModal(false)}
        />
      </Modal>
    </Table>
  );
}

export default ClientTable;
