import AddCardModal from "@/components/AddCardModal";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useMemo, useState } from "react";
import SingleTask from "./SingleTask";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

function Tasks() {
  const [addCardModal, setaddCardModal] = useState(false);
  const [containers, setcontainers] = useState([
    { id: "container1", title: "To Do", color: "#f1f5f9" },
    { id: "container2", title: "In Progress", color: "#555555" },
    { id: "container3", title: "Review", color: "#fef3c7" },
  ]);
  const [tasks, setTasks] = useState([
    {
      taskID: 1,
      containerID: "container1",
      taskTitle: "Design Homepage",
      image: "/images/demo.png",
      deadline: 3,
      comment: 2,
      attachment: 1,
    },
    {
      taskID: 2,
      containerID: "container2",
      taskTitle: "Develop Login Feature",
      image: "/images/demo.png",
      deadline: 2,
      comment: 0,
      attachment: 0,
    },
    {
      taskID: 3,
      containerID: "container1",
      taskTitle: "Write Blog Post",
      image: "/images/demo.png",
      deadline: 5,
      comment: 1,
      attachment: 2,
    },
    {
      taskID: 4,
      containerID: "container3",
      taskTitle: "Prepare Presentation",
      image: "/images/demo.png",
      deadline: 1,
      comment: 3,
      attachment: 0,
    },
  ]);

  const [activeContainer, setActiveContainer] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const containerId = useMemo(() => containers.map((c) => c.id), [containers]);
  const onDragStart = (event) => {
    if (event.active.data.current?.type === "container") {
      setActiveContainer(event.active.data.current.container);
      return;
    }
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (
      active.data.current?.type === "container" &&
      over.data.current?.type === "container"
    ) {
      setcontainers((containers) => {
        const oldIndex = containers.findIndex((c) => c.id === active.id);
        const newIndex = containers.findIndex((c) => c.id === over.id);
        return arrayMove(containers, oldIndex, newIndex);
      });
    }

    // Task reorder
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "task"
    ) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((t) => t.taskID === active.id);
        const newIndex = tasks.findIndex((t) => t.taskID === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }

    setActiveContainer(null);
    setActiveTask(null);
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";
    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskID === active.id);
        const overIndex = tasks.findIndex((t) => t.taskID === over.id);

        // console.log(activeIndex, overIndex);
        tasks[activeIndex].containerID = tasks[overIndex].containerID;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAContainer = over.data.current?.type === "container";
    if (isActiveATask && isOverAContainer) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.taskID === active.id);

        // console.log(activeIndex, overIndex);
        tasks[activeIndex].containerID = over.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 0 } })
  );
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
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
          <SortableContext items={containerId}>
            {containers.map((container) => (
              <TaskCard
                key={container.id}
                id={container.id}
                cardTitle={container.title}
                color={container.color}
                tasks={tasks.filter(
                  (task) => task.containerID === container.id
                )}
                onAddTask={({ containerID, taskTitle }) => {
                  const newTask = {
                    taskID: tasks.length + 1,
                    containerID,
                    taskTitle,
                    image: null,
                    deadline: 0,
                    comment: 0,
                    attachment: 0,
                  };
                  setTasks([...tasks, newTask]);
                }}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeContainer && (
              <TaskCard
                id={activeContainer.id}
                cardTitle={activeContainer.title}
                color={activeContainer.color}
                tasks={tasks.filter(
                  (task) => task.containerID === activeContainer.id
                )}
              />
            )}
            {activeTask && <SingleTask task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <Modal isOpen={addCardModal} onClose={() => setaddCardModal(false)}>
        <AddCardModal
          onCreate={({ title, color }) => {
            const newContainer = {
              id: `container${containers.length + 1}`,
              title,
              color,
            };
            setcontainers([...containers, newContainer]);
            setaddCardModal(false); // close modal
          }}
        />
      </Modal>
    </div>
  );
}

export default Tasks;
