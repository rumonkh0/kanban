import { useEffect, useState } from "react";
import { FilterDropdown, RedButton } from "../../components/Component";
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
