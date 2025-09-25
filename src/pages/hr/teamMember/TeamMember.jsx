import { Icon } from "@/components/Component";
import HrTable from "@/components/HrTable";
import { useState } from "react";
import { Link } from "react-router";
import { FilterDropdown } from "../../../components/Component";

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
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/hr/add-team-member"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add New Members
          </Link>
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
      <HrTable filters={filters} />
    </>
  );
}

export default TeamMember;
