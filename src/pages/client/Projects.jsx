// import { Link } from "react-router";
import { FilterDropdown,  Td, Th } from "../../components/Component";
import { useProjects } from "../../hooks/useProjects";
import { FormatDate } from "../../utils/utils";
// import { useState } from "react";
// import Modal from "../../components/Modal";
// import TaskModal from "@/components/TaskModal";

function Projects() {
  // const [taskModal, setTaskModal] = useState(false);
  const { data: projects = [], isPending } = useProjects();
  if (isPending) return <div>Loading Projects</div>;
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <FilterDropdown
            label="Status"
            options={["Active", "Complete", "On Hold"]}
            className="h-8"
          />
        </div>
      </div>
      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Project ID" />
              {/* <Th title="Client" /> */}
              <Th title="Project Name" />
              <Th title="Start Date" />
              <Th title="Deadline" />
              <Th title="status" />
              <Th title="Last Update" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors cursor-pointer"
                // onClick={() => setTaskModal(true)}
              >
                <Td className="typo-b2 pl-4 text-text  first:rounded-l-[4px] bg-divider">
                  {project.projectId}
                </Td>
                {/* <Td>
                  <Link to="/projects/manage">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="client"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="typo-b2 text-text">{project.client}</span>
                  </div>
                  </Link>
                </Td> */}
                <Td>{project.projectName}</Td>
                <Td>{FormatDate(project.startDate)}</Td>
                <Td>{FormatDate(project.deadline)}</Td>

                <Td>
                  <div className="flex flex-col gap-1.5">
                    <ProgressBar
                      status={project.status}
                      value={parseInt(project.progress)}
                    />
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2  rounded-full"
                        style={{
                          backgroundColor:
                            project.status === "Completed"
                              ? "#8FC951"
                              : project.status === "Active"
                              ? "#5EB7E0"
                              : project.status === "On Hold"
                              ? "#A88AED"
                              : project.status === "Review"
                              ? "#FEEF4D"
                              : project.status === "Overdue"
                              ? "#FE4E4D"
                              : "#ddd",
                        }}
                      ></div>
                      <p className="typo-b3">{project.status}</p>
                    </div>
                  </div>
                </Td>

                <Td className="last:rounded-r-[4px]">{project.lastUpdate}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Modal isOpen={taskModal} onClose={() => setTaskModal(false)}>
        <TaskModal role="client" />
      </Modal> */}
    </>
  );
}

const ProgressBar = ({ value = 0, status, height = 4 }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`w-full rounded-sm overflow-hidden h-${height} ${
        value === 0 ? "bg-text2" : "bg-neutral-900"
      }`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-sm transition-[width] duration-500 text-[8px] flex justify-center items-center text-black"
        style={{
          width: `${clamped}%`,
          backgroundColor:
            status === "Completed"
              ? "#8FC951"
              : status === "In Progress"
              ? "#5EB7E0"
              : status === "Active"
              ? "#5EB7E0"
              : status === "On Hold"
              ? "#A88AED"
              : status === "Review"
              ? "#FEEF4D"
              : status === "Overdue"
              ? "#FE4E4D"
              : "#ddd", // default color
        }}
      />
    </div>
  );
};

export default Projects;
