import ClientTable from "./ClientTable";
import Icon from "@/components/Icon";
import { Link } from "react-router";
import { FilterDropdown } from "@/components/Component";
import { useState } from "react";

function Clients() {
  const [filters, setFilters] = useState({
    status: "",
    match: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <Link
          to="/clients/add-client"
          className="px-4 py-2 typo-cta bg-brand rounded-sm flex items-center gap-1"
        >
          <div className="w-6 h-6 flex justify-center items-center">
            <Icon name="plus" size={15} />
          </div>
          Add New Client
        </Link>
        <div className="flex py-1 gap-4">
          <FilterDropdown
            label="Status"
            options={["Active", "Inactive", "Pending"]}
            value={filters.status}
            onSelect={(value) => handleFilterChange("status", value)}
            className="h-8"
          />

          <FilterDropdown
            label="Select Match"
            options={["Match 1", "Match 2", "Match 3"]}
            value={filters.match}
            onSelect={(value) => handleFilterChange("match", value)}
            className="h-8"
          />
        </div>
      </div>
      <ClientTable filters={filters} />
    </>
  );
}

export default Clients;
