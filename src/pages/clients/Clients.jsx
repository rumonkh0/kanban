import ClientTable from "./ClientTable"
import Icon from "@/components/Icon"
import { Link } from "react-router";

function page() {

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
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select match</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <ClientTable />
    </>
  );
}

export default page;
