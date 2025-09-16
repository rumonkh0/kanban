import React, { useState } from "react";
import { FilterDropdown } from "../../components/Component";
import KanbanBoard from "../tasks/KanbanBoard";

function Task() {
  const [containers, setContainers] = useState([
    { id: "container1", title: "To Do", color: "#f1f5f9" },
    { id: "container2", title: "In Progress", color: "#555555" },
    { id: "container3", title: "Review", color: "#fef3c7" },
  ]);
  return (
    <div className="bg-surface2 p-2 rounded-sm border-2 border-divider">
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex py-1 gap-4">
          <FilterDropdown
            label="Status"
            options={["project one", "project two", "project three"]}
            className="h-8"
          />
          <FilterDropdown
            label="Select Project"
            options={["project one", "project two", "project three"]}
            className="h-8"
          />
        </div>
      </div>
      <KanbanBoard
        containers={containers}
        setContainers={setContainers}
        role="member"
      />
    </div>
  );
}

export default Task;
