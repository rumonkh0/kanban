import { useEffect, useMemo, useRef, useState } from "react";
import { generateKeyBetween } from "fractional-indexing";
import SingleTask from "./SingleTask";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import {
  useCreateTask,
  useTasks,
  useUpdateTaskOrder,
} from "../../hooks/useTasks";
import { useParams } from "react-router";
import { useUpdateStageOrder } from "../../hooks/useStages";

function KanbanBoard({ stages, setStages, role = "member" }) {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const { data: tasksData, isLoading } = useTasks({}, id);
  const createTask = useCreateTask();

  const [activeStage, setActiveStage] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const stageId = useMemo(() => stages?.map((c) => c._id), [stages]);
  const updateStageOrder = useUpdateStageOrder();
  const updateTaskOrder = useUpdateTaskOrder();

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "stage") {
      setActiveStage(event.active.data.current.stage);
      return;
    }
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const handleUpdateTask = (updatedArray, newIndex) => {
    const tasksInTargetStage = updatedArray.filter(
      (t) => t.stage === updatedArray[newIndex].stage
    );

    const filteredIndex = tasksInTargetStage.findIndex(
      (t) => t._id === updatedArray[newIndex]._id
    );

    const prevTask = tasksInTargetStage[filteredIndex - 1];
    const nextTask = tasksInTargetStage[filteredIndex + 1];
    // console.log(updatedArray)

    const newOrder = generateKeyBetween(prevTask?.order, nextTask?.order);

    updateTaskOrder.mutate({
      id: updatedArray[newIndex]._id,
      prev: prevTask?._id,
      next: nextTask?._id,
      newStage: updatedArray[newIndex].stage,
    });

    return newOrder;
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (
      active.data.current?.type === "stage" &&
      over.data.current?.type === "stage"
    ) {
      setStages((stages) => {
        const oldIndex = stages.findIndex((c) => c._id === active.id);
        const newIndex = stages.findIndex((c) => c._id === over.id);
        const updatedArray = arrayMove(stages, oldIndex, newIndex);

        const prevStage = updatedArray[newIndex - 1];
        const nextStage = updatedArray[newIndex + 1];

        const newOrder = generateKeyBetween(prevStage?.order, nextStage?.order);
        updateStageOrder.mutate({
          id: updatedArray[newIndex]._id,
          prev: prevStage?._id,
          next: nextStage?._id,
        });

        updatedArray[newIndex] = {
          ...updatedArray[newIndex],
          order: newOrder,
        };
        return updatedArray;
      });
    }

    // Task reorder
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task"
    ) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((t) => t._id === active.id);
        const newIndex = tasks.findIndex((t) => t._id === over.id);
        const updatedArray = arrayMove(tasks, oldIndex, newIndex);

        const newOrder = handleUpdateTask(updatedArray, newIndex);
        updatedArray[newIndex] = {
          ...updatedArray[newIndex],
          order: newOrder,
        };
        return updatedArray;
      });
    }

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "stage"
    ) {
      setTasks((tasks) => {
        const updatedArray = [...tasks];
        const newIndex = updatedArray.findIndex(
          (t) => t._id === activeTask._id
        );

        const newOrder = handleUpdateTask(updatedArray, newIndex);
        updatedArray[newIndex] = {
          ...updatedArray[newIndex],
          order: newOrder,
        };
        return updatedArray;
      });
    }

    if (active.data.current?.type === "task" && over === null) {
      setTasks((tasks) => {
        const updatedArray = [...tasks];
        const newIndex = updatedArray.findIndex(
          (t) => t._id === activeTask._id
        );

        const newOrder = handleUpdateTask(updatedArray, newIndex);
        updatedArray[newIndex] = {
          ...updatedArray[newIndex],
          order: newOrder,
        };
        return updatedArray;
      });
    }

    setActiveStage(null);
    setActiveTask(null);
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";
    const isOverAStage = over.data.current?.type === "stage";

    if (!isActiveATask) return;

    setTasks((prev) => {
      const tasks = [...prev];

      const activeIndex = tasks.findIndex((t) => t._id === active.id);

      if (isOverATask) {
        const overIndex = tasks.findIndex((t) => t._id === over.id);

        // only update if stageId actually changes
        if (tasks[activeIndex].stage !== tasks[overIndex].stage) {
          tasks[activeIndex] = {
            ...tasks[activeIndex],
            stage: tasks[overIndex].stage,
          };

          return tasks;
        }
      }

      if (isOverAStage) {
        if (tasks[activeIndex].stage !== over.id) {
          tasks[activeIndex] = {
            ...tasks[activeIndex],
            stage: over.id,
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
  const renderCount = useRef(0);

  renderCount.current += 1; // increase on every render

  useEffect(() => {
    console.log("Rendered:", renderCount.current);
  });
  if (isLoading) return <div className="text-center">Loading tasks</div>;
  return (
    <>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
          <SortableContext items={stageId}>
            {stages?.map((stage) => {
              const selectedTasks = tasks.filter(
                (task) => task.stage === stage._id
              );
              return (
                <TaskCard
                  key={stage._id}
                  id={stage._id}
                  cardTitle={stage.title}
                  color={stage.color}
                  tasks={selectedTasks}
                  onAddTask={({ title }) => {
                    const lastOrder =
                      selectedTasks.length > 0
                        ? selectedTasks[selectedTasks.length - 1].order
                        : null;
                    const newTask = {
                      project: id,
                      stage: stage._id,
                      order: generateKeyBetween(lastOrder),
                      title,
                    };
                    createTask.mutate(newTask);
                  }}
                  role={role}
                />
              );
            })}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeStage && (
              <TaskCard
                id={activeStage.id}
                cardTitle={activeStage.title}
                color={activeStage.color}
                tasks={tasks.filter((task) => task.stage === activeStage.id)}
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
