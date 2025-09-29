import { Icon } from "@/components/Component";
import HrTable from "@/components/HrTable";
import { useState } from "react";
import { Link } from "react-router";
import { FilterDropdown, RedButton } from "../../../components/Component";

function TeamMember() {
  const [filters, setFilters] = useState({
    status: "",
    match: "",
    client: "",
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
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        <Link to="/hr/add-team-member" className="flex">
          <RedButton className="flex-1 px-4">
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add New Members
          </RedButton>
        </Link>

        <div className="flex flex-wrap gap-2 lg:gap-4 py-1">
          {filterConfigs.map(({ key, label, options }) => (
            <FilterDropdown
              key={key}
              label={label}
              options={options}
              value={filters[key]}
              onSelect={(value) => handleFilterChange(key, value)}
              className="h-8 flex-1 min-w-[150px] lg:min-w-0"
            />
          ))}
        </div>
      </div>

      <HrTable filters={filters} />
    </>
  );
}

export default TeamMember;
