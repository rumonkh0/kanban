import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Modal from "@/components/Modal";
import TaskModal from "@/components/TaskModal";
import Icon from "@/components/Icon";
const SingleCard = ({ task, role }) => {
  const {
    _id,
    title: taskTitle = "Task",
    image = "/images/demo.png",
    deadline = 2,
    comment = 0,
    attachment = 0,
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
        <div>
          <img src={image} className="rounded-lg" />
        </div>
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
            <Icon name="chat" size={20} /> {comment}
            <Icon name="attachment" size={20} /> {attachment}
            <div className="h-7 p-1 flex items-center gap-1 bg-brand/20 text-brand rounded-xs">
              <Icon name="calendar-red" /> {deadline} Days
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
      <Modal isOpen={taskModal} onClose={() => setTaskModal(false)}>
        <TaskModal role={role} />
      </Modal>
    </>
  );
};

export default SingleCard;
