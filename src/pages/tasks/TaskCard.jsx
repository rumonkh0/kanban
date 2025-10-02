import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react"; // ⬅️ added useRef + useEffect
import DropdownMenu from "@/components/DropdownMenu";
import { RedButton } from "@/components/Component";
import Icon from "@/components/Icon";
import SingleTask from "./SingleTask";
import { useDeleteStage } from "../../hooks/useStages";

const TaskCard = ({
  id,
  cardTitle = "To Do",
  color,
  tasks,
  onAddTask,
  role = "member",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const deleteStageMutation = useDeleteStage();

  // ⬅️ Ref for the input
  const inputRef = useRef(null);

  // ⬅️ Focus when addTask is toggled on
  useEffect(() => {
    if (addTask && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addTask]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { type: "stage", stage: { id, title: cardTitle, color } },
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
        className="flex-1 min-w-[290px] h-[700px] bg-surface border-2 border-divider rounded-lg p-2 pt-3 flex flex-col gap-2"
      ></div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteStageMutation.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-1 min-w-[290px] h-[700px] bg-surface border-2 border-divider rounded-lg p-2 pt-3 flex flex-col gap-2"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div
          {...attributes}
          {...listeners}
          className="flex-1 cursor-grab active:cursor-grabbing hover:bg-surface2"
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
            menuItems={[
              { label: "Edit", onClick: () => console.log("Edit clicked") },
              { label: "Delete", onClick: () => handleDelete(id) },
            ]}
            className="top-full right-0 mt-1"
          />
        </div>
      </div>

      {/* Add Task button (only admin) */}
      {role === "admin" && (
        <div
          onClick={() => setAddTask(!addTask)}
          className="h-12 shrink-0 bg-divider rounded-sm flex justify-center items-center gap-2 cursor-pointer"
        >
          <Icon name="plus" size={16} /> Add Task
        </div>
      )}

      {/* Add Task form */}
      {addTask && (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent reload
            if (!newTaskTitle) return;
            onAddTask({ title: newTaskTitle });
            setNewTaskTitle("");
            setAddTask(false);
          }}
          className="p-2 bg-divider rounded-sm flex flex-col justify-center items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full h-8 px-2 typo-b3 rounded-sm bg-surface outline-none"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <RedButton className="typo-b3 px-2" type="submit">
            Add Task
          </RedButton>
        </form>
      )}

      {/* Task list */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={tasks.map((task) => task._id)}
        >
          {tasks.map((task) => (
            <SingleTask key={task._id} task={task} role={role} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskCard;
