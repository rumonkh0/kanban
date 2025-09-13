import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { RedButton } from "@/components/Component";
import Icon from "@/components/Icon";
import SingleTask from "./SingleTask";

const TaskCard = ({ id, cardTitle = "To Do", color, tasks, onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { type: "container", container: { id, title: cardTitle, color } },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex-1 min-w-[290px] h-[700px] bg-surface border-2 border-divider rounded-lg p-2 pt-3  flex flex-col gap-2"
      ></div>
    );
  }
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex-1 min-w-[290px] h-[700px] bg-surface border-2 border-divider rounded-lg p-2 pt-3  flex flex-col gap-2"
      >
        <div className="flex justify-between items-center">
          <div
            {...attributes}
            {...listeners}
            className="flex-1 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`inline-block w-3 h-3 mr-2 rounded-full`}
              style={{ backgroundColor: color }}
            ></div>
            {cardTitle}
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
        <div
          onClick={() => setAddTask(!addTask)}
          className="h-12 shrink-0 bg-divider rounded-sm flex justify-center items-center gap-2 cursor-pointer"
        >
          <Icon name="plus" size={16} /> Add Task
        </div>
        {addTask && (
          <div className="p-2 bg-divider rounded-sm flex flex-col justify-center items-center gap-2 cursor-pointer">
            <input
              type="text"
              className="w-full h-8 px-2 typo-b3 rounded-sm bg-surface outline-none"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <RedButton
              className="typo-b3"
              onClick={() => {
                if (!newTaskTitle) return;
                onAddTask({
                  containerID: id,
                  taskTitle: newTaskTitle,
                });
                setNewTaskTitle("");
                setAddTask(false);
              }}
            >
              Add Task
            </RedButton>
          </div>
        )}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2">
          <SortableContext items={tasks.map((task) => task.taskID)}>
            {tasks.map((task) => (
              <SingleTask key={task.taskID} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
