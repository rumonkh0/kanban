import { useEffect, useState } from "react";
import { generateKeyBetween } from "fractional-indexing";
import { FilterDropdown, RedButton } from "../../components/Component";
import KanbanBoard from "./KanbanBoard";
import AddCardModal from "@/components/AddCardModal";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import {
  useCreateStage,
  useStages,
} from "../../hooks/useStages";
import { useParams } from "react-router";
import PageTitle from "../../components/PageTitle";

// const taka = [
//   {
//     _id: "68d2bb424ea0d3c732809eae",
//     title: "To Do",
//     color: "#f1f2f3",
//     order: "3",
//     createdAt: "2025-09-23T15:22:42.935Z",
//     updatedAt: "2025-09-23T15:22:42.935Z",
//     __v: 0,
//   },
//   {
//     _id: "68d2bb524ea0d3c732809eb1",
//     title: "In Progress",
//     color: "#f1f2f3",
//     order: "4",
//     createdAt: "2025-09-23T15:22:58.391Z",
//     updatedAt: "2025-09-23T15:22:58.391Z",
//     __v: 0,
//   },
//   {
//     _id: "68d2bb664ea0d3c732809eb4",
//     title: "Done",
//     color: "#00FF00",
//     order: "5",
//     createdAt: "2025-09-23T15:23:18.455Z",
//     updatedAt: "2025-09-23T15:23:18.455Z",
//     __v: 0,
//   },
//   {
//     _id: "68d2bb8e4ea0d3c732809eb7",
//     title: "Review",
//     color: "#00FF00",
//     order: "6",
//     createdAt: "2025-09-23T15:23:58.710Z",
//     updatedAt: "2025-09-23T15:23:58.710Z",
//     __v: 0,
//   },
// ];

function Tasks() {
  const { id } = useParams();
  const [addCardModal, setaddCardModal] = useState(false);
  const [stages, setStages] = useState([]);

  const { data: stagesData, isLoading } = useStages();
  const createMutation = useCreateStage();


  useEffect(() => {
    if (stagesData) {
      setStages(stagesData);
    }
  }, [stagesData]);

  if (isLoading) return <div className="text-center">Loading tasks</div>;
  return (
    <div className="bg-surface2 p-2 rounded-sm border-2 border-divider select-none">
      <PageTitle title="Tasks" />
      <div className=" flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        <div className="flex gap-4 cursor-pointer flex-wrap">
          {/* <div
            onClick={() => setaddCardModal(true)}
            className="bg-brand rounded-sm flex-1 flex flex-wrap items-center justify-center gap-1"
          > */}
          <RedButton
            onClick={() => setaddCardModal(true)}
            className="flex-1 px-4"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Another Card
          </RedButton>
          {/* </div> */}
        </div>
        {!id && (
          <div className="flex flex-wrap gap-2 lg:gap-4 py-1">
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8 flex-1 min-w-[150px] lg:min-w-0"
            />
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8 flex-1 min-w-[150px] lg:min-w-0"
            />
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8 flex-1 min-w-[150px] lg:min-w-0"
            />
          </div>
        )}
      </div>

      <KanbanBoard stages={stages} setStages={setStages} role="admin" />
      <Modal isOpen={addCardModal} onClose={() => setaddCardModal(false)}>
        <AddCardModal
          onCreate={({ title, color }) => {
            const lastOrder =
              stages.length > 0 ? stages[stages.length - 1].order : null;
            const newStage = {
              title,
              color,
              order: generateKeyBetween(lastOrder, null),
            };
            createMutation.mutate(newStage);
            setaddCardModal(false); // close modal
          }}
          
        />
      </Modal>
    </div>
  );
}

export default Tasks;
