import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Modal from "@/components/Modal";
import TaskModal from "@/components/TaskModal";
import Icon from "@/components/Icon";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
const SingleCard = ({ task, role }) => {
  const {
    _id,
    title: taskTitle = "Task",
    images = [],
    dueDate,
    comments = 0,
    files = 0,
  } = task;
  const [taskModal, setTaskModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: _id,
    data: { type: "task", task: task },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // const image = images[0]
  //   ? `${baseURL}/${images[0].filePath}`
  //   : "/images/profile.png";

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`flex flex-col gap-1 p-2 bg-divider rounded-sm justify-center items-center cursor-grab active:cursor-grabbing ${
          isDragging && "opacity-20"
        }`}
      >
        {images.length > 0 && (
          <div>
            <img
              src={`${baseURL}/${images[0].filePath}`}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="w-full flex justify-between items-center">
          <div>{taskTitle}</div>
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
            <Icon name="chat" size={20} /> {comments.length}
            <Icon name="attachment" size={20} /> {files.length}
            {dueDate && (
              <div className="h-7 p-1 flex items-center gap-1 bg-brand/20 text-brand rounded-xs">
                <Icon name="calendar-red" /> {console.log(dueDate)}
                {Math.ceil(
                  (new Date(dueDate) - Date.now()) / (1000 * 60 * 60 * 24)
                )}{" "}
                Days
              </div>
            )}
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
      <Modal isOpen={taskModal} onClose={() => setTaskModal(false)}>
        <TaskModal role={role} id={_id} />
      </Modal>
    </>
  );
};

export default SingleCard;
