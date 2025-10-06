import Icon from "@/components/Icon";
import DropdownMenu from "@/components/DropdownMenu";
import { Link } from "react-router";
import { useState } from "react";
import { Bin, Pin } from "../../components/Icon";
import {
  FilterDropdown,
  ImageName,
  RedButton,
  Td,
  Th,
} from "../../components/Component";
import { useDeleteProject, useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { FormatDate } from "../../utils/utils";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function Projects() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    match: null,
    client: null,
    pin: false,
    archive: false,
  });
  const { data: clientsData } = useClients();

  const filterConfigs = [
    {
      key: "status",
      label: "Status",
      options: ["Active", "Inactive", "Pending"],
    },
    // {
    //   key: "match",
    //   label: "Select Match",
    //   options: ["Match 1", "Match 2", "Match 3"],
    // },
    {
      key: "client",
      label: "Select Client",
      options: clientsData?.map((client) => ({
        value: client._id,
        label: client.name,
      })),
    },
  ];
  const { data: projectsData, isLoading, isError } = useProjects(filters);
  const deleteClientMutation = useDeleteProject();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClientMutation.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };

  const menuItems = (id) => [
    { label: "View", href: `/projects/${id}/manage` },
    { label: "Edit", href: `/projects/${id}/edit` },
    // { label: "Duplicate" },
    { label: "Public Task Board", href: `/projects/${id}/manage/tasks` },
    { label: "Pin Project", onClick: () => handleDelete(id) },
    { label: "Archive", onClick: () => handleDelete(id) },
    { label: "Delete", onClick: () => handleDelete(id) },
  ];

  if (isLoading) {
    return <div className="text-center typo-h1">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center typo-h1">Error loading projects</div>;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4 lg:gap-0">
        <div className="flex flex-wrap gap-4">
          <Link to="/projects/add-project" className="flex flex-1">
            <RedButton className="flex-1 px-4">
              <div className="w-6 h-6 flex justify-center items-center">
                <Icon name="plus" size={15} />
              </div>
              Add New Project
            </RedButton>
          </Link>
          <div
            onClick={() => handleFilterChange("pin", !filters.archive)}
            className={`w-10 h-10 flex justify-center items-center border-2 border-divider rounded-sm cursor-pointer hover:bg-surface2/60 ${
              filters.archive ? "border-brand" : ""
            }`}
          >
            <Bin className="text-text2 " />
          </div>
          <div
            onClick={() => handleFilterChange("pin", !filters.pin)}
            className={`w-10 h-10 flex justify-center items-center border-2 border-divider rounded-sm cursor-pointer 
        ${filters.pinned ? "border-brand" : ""}`}
          >
            <Pin className={filters.pin ? "text-brand" : "text-text2"} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 lg:gap-4">
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
      </div>

      {projectsData?.length > 0 ? (
        <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
          <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
            <thead className="table-header-group after:content-[''] after:block after:h-1">
              <tr className="text-left">
                <Th title="Project ID" />
                <Th title="Client" />
                <Th title="Project Name" />
                <Th title="Members" />
                <Th title="Start Date" />
                <Th title="Deadline" />
                <Th title="status" />
                <Th title="Action" />
              </tr>
            </thead>
            <tbody>
              {projectsData.map((project, index) => {
                const clientImage = project.client?.profilePicture?.filePath
                  ? `${baseURL}/${project.client.profilePicture.filePath}`
                  : "/images/profile.png";
                return (
                  <tr
                    key={index}
                    className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                  >
                    <Td className="typo-b2 pl-4 text-text  first:rounded-l-[4px] bg-divider">
                      {project.shortCode}
                    </Td>
                    <Td className=" bg-divider">
                      {project.client ? (
                        <ImageName
                          image={clientImage}
                          username={project.client?.name}
                        />
                      ) : (
                        "----"
                      )}
                    </Td>
                    <Td className="typo-b2 text-text  bg-divider">
                      <Link to={`/projects/${project._id}/manage`}>
                        {project.projectName}
                      </Link>
                    </Td>
                    <Td className=" bg-divider">
                      <Members members={project.members} />
                    </Td>
                    <Td className="typo-b2 text-text  bg-divider">
                      {project.startDate && FormatDate(project.startDate)}
                    </Td>
                    <Td className="typo-b2 text-text  bg-divider">
                      {project.noDeadline ? (
                        "No Due Date"
                      ) : (
                        <p className="text-brand">
                          {FormatDate(project.dueDate)}
                        </p>
                      )}
                    </Td>

                    <Td className=" bg-divider">
                      <div className="flex flex-col gap-1.5">
                        <ProgressBar value={parseInt(project.progress)} />
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2  rounded-full bg-success"></div>
                          <p className="typo-b3">{project.status}</p>
                        </div>
                      </div>
                    </Td>

                    <Td className="text-center last:rounded-r-[4px] bg-divider ">
                      <button
                        onClick={(e) => handleMenuClick(index, e)}
                        className="p-2 rounded-sm border border-text2 cursor-pointer hover:bg-surface2/60 relative"
                      >
                        <Icon name="menu" size={20} />
                        <DropdownMenu
                          isOpen={activeMenu === index}
                          onClose={() => setActiveMenu(null)}
                          menuItems={menuItems(project._id)}
                        />
                      </button>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center typo-h1">No project found</div>
      )}
    </>
  );
}

const ProgressBar = ({ value = 0, color = "#8FC951", height = 4 }) => {
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
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  );
};

function Members({ members }) {
  if (!members || members.length === 0) return "-------";

  // ✅ Only 1 member → avatar + name
  if (members.length === 1) {
    const m = members[0];
    const memberImage = m?.profilePicture?.filePath
      ? `${baseURL}/${m.profilePicture.filePath}`
      : "/images/profile.png";
    return <ImageName image={memberImage} username={m.name} />;
  }

  return (
    <div className="flex -space-x-3">
      {members.slice(0, 5).map((m, idx) => {
        const memberImage = m?.profilePicture?.filePath
          ? `${baseURL}/${m.profilePicture.filePath}`
          : "/images/profile.png";

        return (
          <img
            key={idx}
            src={memberImage}
            alt={m?.name || `member ${idx}`}
            title={m?.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
        );
      })}
      {members.length > 5 && (
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xs text-gray-700 border-2 border-white">
          +{members.length - 5}
        </span>
      )}
    </div>
  );
}

export default Projects;
