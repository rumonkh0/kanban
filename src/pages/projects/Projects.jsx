import Icon from "@/components/Icon";
import DropdownMenu from "@/components/DropdownMenu";
import { Link } from "react-router";
import { useState } from "react";
import { Bin, Pin } from "../../components/Icon";
import { FilterDropdown, Th } from "../../components/Component";
import { useProjects } from "../../hooks/useProjects";

function Projects() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    match: "",
    client: "",
    pinned: false,
  });

  const filterConfigs = [
    {
      key: "status",
      label: "Status",
      options: ["Active", "Inactive", "Pending"],
    },
    {
      key: "match",
      label: "Select Match",
      options: ["Match 1", "Match 2", "Match 3"],
    },
    {
      key: "client",
      label: "Select Client",
      options: ["Client 1", "Client 2", "Client 3"],
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const menuItems = (id) => [
    { label: "View", href: `/projects/${id}/manage` },
    { label: "Edit", href: `/projects/${id}/edit` },
    { label: "Duplicate", href: `/projects/${id}/duplicate` },
    { label: "Public Task Board" },
    { label: "Pin Project", href: `/projects/${id}/pin` },
    { label: "Archive", href: `/projects/${id}/archive` },
    { label: "Delete", href: `/projects/${id}/delete` },
  ];

  const { data: projectsData, isLoading, isError } = useProjects(filters);
  const projects = Array.isArray(projectsData) || [
    {
      id: 1,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 13, 2025",
      deadline: null,
      status: "On Hold",
      progress: "60%",
    },
    {
      id: 2,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "Review",
      progress: "100%",
    },
    {
      id: 3,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      id: 4,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      id: 5,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      id: 6,
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 13, 2025",
      deadline: "Aug 23, 2025",
      status: "Not Started",
      progress: "0%",
    },
    {
      id: 7,
      projectId: "#9F3KDL",
      client: "Lydia Marks",
      projectName: "Mobile Banking App",
      members: "Darius Green",
      startDate: "Jul 20, 2025",
      deadline: "Sep 15, 2025",
      status: "In Progress",
      progress: "45%",
    },
    {
      id: 8,
      projectId: "#4X9TQP",
      client: "Orlando Bailey",
      projectName: "E-commerce Platform",
      members: "Sophia Patel",
      startDate: "Jun 1, 2025",
      deadline: "Oct 10, 2025",
      status: "Delayed",
      progress: "30%",
    },
    {
      id: 9,
      projectId: "#7M2PLD",
      client: "Clara Fischer",
      projectName: "Marketing Analytics Dashboard",
      members: "Michael Johnson",
      startDate: "Aug 5, 2025",
      deadline: "Sep 30, 2025",
      status: "Review",
      progress: "90%",
    },
    {
      id: 10,
      projectId: "#6A1KDE",
      client: "Samuel Harris",
      projectName: "Internal HR Portal",
      members: "Alice Wong",
      startDate: "Jul 10, 2025",
      deadline: "Aug 25, 2025",
      status: "Completed",
      progress: "100%",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading projects</div>;
  }
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/projects/add-project"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add New Project
          </Link>
          <div className="w-10 h-10 flex justify-center items-center border-2 border-divider rounded-sm cursor-pointer hover:bg-surface2/60">
            <Bin className="text-text2 " />
          </div>
          <div
            onClick={() => handleFilterChange("pinned", !filters.pinned)}
            className={`w-10 h-10 flex justify-center items-center border-2 border-divider rounded-sm cursor-pointer 
    ${filters.pinned ? "border-brand" : ""}`}
          >
            <Pin className={filters.pinned ? "text-brand" : "text-text2"} />
          </div>
        </div>
        <div className="flex py-1 gap-4">
          {filterConfigs.map(({ key, label, options }) => (
            <FilterDropdown
              key={key}
              label={label}
              options={options}
              value={filters[key]}
              onSelect={(value) => handleFilterChange(key, value)}
              className="h-8"
            />
          ))}
        </div>
      </div>
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
            {projects.map((project, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <td className="typo-b2 pl-4 text-text  first:rounded-l-[4px] bg-divider">
                  {project.projectId}
                </td>
                <td className=" bg-divider">
                  <Link to={`/projects/${project.id}/manage`}>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/profile.png"
                        alt="client"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="typo-b2 text-text">
                        {project.client}
                      </span>
                    </div>
                  </Link>
                </td>
                <td className="typo-b2 text-text  bg-divider">
                  {project.projectName}
                </td>
                <td className=" bg-divider">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="assigned"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="typo-b2 text-text">{project.members}</span>
                  </div>
                </td>
                <td className="typo-b2 text-text  bg-divider">
                  {project.startDate}
                </td>
                <td className="typo-b2 text-text  bg-divider">
                  {project.deadline}
                </td>

                <td className=" bg-divider">
                  <div className="flex flex-col gap-1.5">
                    <ProgressBar value={parseInt(project.progress)} />
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2  rounded-full bg-success"></div>
                      <p className="typo-b3">{project.status}</p>
                    </div>
                  </div>
                </td>

                <td className="text-center last:rounded-r-[4px] bg-divider ">
                  <button
                    onClick={(e) => handleMenuClick(index, e)}
                    className="p-2 rounded-sm border border-text2 cursor-pointer hover:bg-surface2/60 relative"
                  >
                    <Icon name="menu" size={20} />
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={menuItems(project.id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Projects;
