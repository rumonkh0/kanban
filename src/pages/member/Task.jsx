import React, { useEffect, useState } from "react";
import { FilterDropdown } from "../../components/Component";
import KanbanBoard from "../tasks/KanbanBoard";
import { useStages } from "../../hooks/useStages";
import { useProjects } from "../../hooks/useProjects";
import { useAuthStore } from "../../stores/authStore";

function Task() {
  const [stages, setStages] = useState([]);
  const [filters, setFilters] = useState({
    project: null,
  });
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const freelancerId = useAuthStore((state) => state.user.user._id);
  const { data: projectsData } = useProjects({ members: freelancerId });

  const filterConfigs = [
    {
      key: "project",
      label: "Select Project",
      options: projectsData?.map((project) => ({
        value: project._id,
        label: project.projectName,
      })),
    },
  ];
  const { data: stagesData, isLoading } = useStages();
  useEffect(() => {
    if (stagesData) {
      setStages(stagesData);
    }
  }, [stagesData]);
  if (isLoading) return <div className="text-center">Loading tasks</div>;
  return (
    <div className="bg-surface2 p-2 rounded-sm border-2 border-divider">
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex py-1 gap-4">
          {filterConfigs.map(({ key, label, options }) => (
            <FilterDropdown
              key={key}
              label={label}
              options={options}
              value={filters[key]}
              onSelect={(value) => handleFilterChange(key, value)}
              className="h-8 w-full sm:w-auto"
              allowClear
            />
          ))}
        </div>
      </div>
      <KanbanBoard
        filters={filters}
        stages={stages}
        // setContainers={setContainers}
        role="member"
      />
    </div>
  );
}

export default Task;
