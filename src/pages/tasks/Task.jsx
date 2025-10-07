import { useEffect, useState } from "react";
import { generateKeyBetween } from "fractional-indexing";
import { FilterDropdown, RedButton } from "../../components/Component";
import KanbanBoard from "./KanbanBoard";
import AddCardModal from "@/components/AddCardModal";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useCreateStage, useStages } from "../../hooks/useStages";
import { useParams } from "react-router";
import PageTitle from "../../components/PageTitle";
import { useProjects } from "../../hooks/useProjects";
import { useTeamMembers } from "../../hooks/useTeam";
import Loading from "../../components/Loading";

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
  const { data: projectsData } = useProjects();
  const { data: memberData } = useTeamMembers();
  const createMutation = useCreateStage();

  const [filters, setFilters] = useState({
    project: id || null,
    members: null,
  });

  const filterConfigs = [
    {
      key: "members",
      label: "Select Member",
      options: memberData?.map((project) => ({
        value: project._id,
        label: project.name,
      })),
    },
    {
      key: "project",
      label: "Select Project",
      options: projectsData?.map((project) => ({
        value: project._id,
        label: project.projectName,
      })),
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (stagesData) {
      setStages(stagesData);
    }
  }, [stagesData]);

  if (isLoading) return <Loading />;
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
            {filterConfigs.map(({ key, label, options }) => (
              <FilterDropdown
                key={key}
                label={label}
                options={options}
                value={filters[key]}
                onSelect={(value) => handleFilterChange(key, value)}
                className="h-8 w-full sm:w-auto"
              />
            ))}
          </div>
        )}
      </div>

      <KanbanBoard
        stages={stages}
        setStages={setStages}
        role="admin"
        filters={filters}
      />
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
