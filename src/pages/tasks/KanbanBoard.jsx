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
function KanbanBoard({ containers, setContainers, role = "member" }) {
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
      setContainers((containers) => {
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
    const isOverAContainer = over.data.current?.type === "container";

    if (!isActiveATask) return;

    setTasks((prev) => {
      const tasks = [...prev]; // copy array

      const activeIndex = tasks.findIndex((t) => t.taskID === active.id);

      if (isOverATask) {
        const overIndex = tasks.findIndex((t) => t.taskID === over.id);

        // only update if containerID actually changes
        if (tasks[activeIndex].containerID !== tasks[overIndex].containerID) {
          tasks[activeIndex] = {
            ...tasks[activeIndex],
            containerID: tasks[overIndex].containerID,
          };
        }

        return arrayMove(tasks, activeIndex, overIndex);
      }

      if (isOverAContainer) {
        if (tasks[activeIndex].containerID !== over.id) {
          tasks[activeIndex] = {
            ...tasks[activeIndex],
            containerID: over.id,
          };
        }

        return tasks;
      }

      return tasks;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 0 } })
  );
  return (
    <>
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
                role={role}
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
    </>
  );
}

export default KanbanBoard;
