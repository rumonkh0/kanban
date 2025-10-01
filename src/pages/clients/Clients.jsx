import ClientTable from "./ClientTable";
import Icon from "@/components/Icon";
import { Link } from "react-router";
import { FilterDropdown } from "@/components/Component";
import { useState } from "react";
import { RedButton } from "../../components/Component";

function Clients() {
  const [filters, setFilters] = useState({
    status: null,
    match: null,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4 lg:gap-0">
        <Link
          to="/clients/add-client"
          className="flex"
          // className="px-4 py-2 typo-cta bg-brand rounded-sm flex items-center gap-1 w-full lg:w-auto justify-center lg:justify-start"
        >
          <RedButton className="flex-1 px-4">
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add New Client
          </RedButton>
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 w-full lg:w-auto">
          <FilterDropdown
            label="Status"
            options={["Active", "Inactive", "Pending"]}
            value={filters.status}
            onSelect={(value) => handleFilterChange("status", value)}
            className="h-8 w-full sm:w-auto"
          />

          <FilterDropdown
            label="Select Match"
            options={["Match 1", "Match 2", "Match 3"]}
            value={filters.match}
            onSelect={(value) => handleFilterChange("match", value)}
            className="h-8 w-full sm:w-auto"
          />
        </div>
      </div>

      <ClientTable filters={filters} />
    </>
  );
}

export default Clients;
