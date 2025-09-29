import { useEffect, useState } from "react";
import { FilterDropdown } from "../../components/Component";
import KanbanBoard from "./KanbanBoard";
import AddCardModal from "@/components/AddCardModal";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useStages } from "../../hooks/useStages";
import { useParams } from "react-router";
import PageTitle from "../../components/PageTitle";

function Tasks() {
  const { id } = useParams();
  const [addCardModal, setaddCardModal] = useState(false);
  const [containers, setContainers] = useState([]);
  const { data: stages, isLoading } = useStages();
  console.log("id", id);
  useEffect(() => {
    if (stages) {
      console.log("stages:  ", stages);
      setContainers(stages);
    }
  }, [stages]);

  if (isLoading) return <div className="text-center">Loading tasks</div>;
  return (
    <div className="bg-surface2 p-2 rounded-sm border-2 border-divider">
      <PageTitle title="Tasks" />
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
        {!id && (
          <div className="flex py-1 gap-4">
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8"
            />
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8"
            />
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-8"
            />
          </div>
        )}
      </div>
      <KanbanBoard
        containers={containers}
        setContainers={setContainers}
        role="admin"
      />
      <Modal isOpen={addCardModal} onClose={() => setaddCardModal(false)}>
        <AddCardModal
          onCreate={({ title, color }) => {
            const newContainer = {
              id: `container${containers.length + 1}`,
              title,
              color,
            };
            setContainers([...containers, newContainer]);
            setaddCardModal(false); // close modal
          }}
        />
      </Modal>
    </div>
  );
}

export default Tasks;
