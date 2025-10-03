import { useState } from "react";
import Icon from "@/components/Icon";
import { Link } from "react-router";
import Modal from "@/components/Modal";
import PaymentDetailsModal from "@/components/PaymentDetailsModal";
import DropdownMenu from "@/components/DropdownMenu";
import {
  Dropdown,
  FilterDropdown,
  ImageName,
  Td,
  Th,
  // Import FormatDate from the first file for consistency
  FormatDate,
  RedButton,
} from "../../components/Component";
import { useDeletePaidTo, usePaidTos } from "../../hooks/useFinance";

// Define baseURL if the paidTo data also includes image paths
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function PaidTo({ from }) {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [filters, setFilters] = useState({
    status: null,
    project: null, 
    client: null,
  });

  // Filter Configurations array, aligned with the Payment component structure
  const filterConfigs = [
    {
      key: "status",
      label: "Status",
      options: ["complete", "incomplete", "Owed"],
    },
    {
      key: "project",
      label: "Select Project",
      options: ["Project A", "Project B", "Project C"], // Placeholder options
    },
    {
      key: "client",
      label: "Select Client",
      options: ["Client X", "Client Y", "Client Z"], // Placeholder options
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const deletePaidTo = useDeletePaidTo();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deletePaidTo.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };

  // Pass all filters to the hook
  const { data: payments, isLoading, isError } = usePaidTos(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading payments</div>;
  }

  function toTwoDecimal(num) {
    const n = parseFloat(num);
    if (isNaN(n)) return "0.00";
    return n.toFixed(2);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          <Link
            to={`/${from}/paid-to`}
            className="bg-brand rounded-sm flex items-center flex-1 lg:flex-none  justify-center"
          >
            <RedButton>
              <div className="w-6 h-6 flex justify-center items-center">
                <Icon name="plus" size={15} />
              </div>
              Paid To
            </RedButton>
          </Link>
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

      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Project" />
              <Th title="Paid To" />
              <Th title="To Be Paid" />
              <Th title="Payment Date" />
              <Th title="Amount Paid" />
              <Th title="Amount Owed" />
              <Th title="Payment Method" />
              {/* <Th title="Status" /> */}
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              // Construct image URL if available, otherwise use a default
              const imageUrl = payment.freelancer?.profilePicture?.filePath
                ? `${baseURL}/${payment.freelancer.profilePicture.filePath}`
                : "/images/profile.png";

              return (
                <tr
                  key={payment.id}
                  className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                >
                  {/* Project Name */}
                  <Td className="first:rounded-l-[4px] min-w-50">
                    {payment.project?.projectName || "N/A"}
                  </Td>
                  {/* Paid To (Person/Vendor) */}
                  <Td>
                    <ImageName
                      image={imageUrl}
                      username={payment.freelancer?.name}
                      designation={payment.freelancer?.user?.email}
                    />
                  </Td>
                  {/* Amounts and Date */}
                  <Td>${toTwoDecimal(payment.toBePaid)}</Td>
                  <Td>{FormatDate(payment.paymentDate)}</Td>
                  {/* Using FormatDate */}
                  <Td className="text-success">
                    ${toTwoDecimal(payment.amountPaid)}
                  </Td>
                  <Td className="text-brand">
                    ${toTwoDecimal(payment.amountOwed)}
                  </Td>
                  <Td>{payment.paidMethod}</Td>
                  {/* Status */}
                  {/* <StatusCell payment={payment} /> */}
                  {/* Action Menu (Position fixed) */}
                  <Td className="last:rounded-r-[4px] relative">
                    <button
                      onClick={(e) => handleMenuClick(index, e)}
                      className="p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60"
                    >
                      <Icon name="menu" size={20} />
                    </button>
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={[
                        {
                          label: "View",
                          onClick: () => {
                            setCurrentId(payment._id);
                            setPaymentModal(true);
                          },
                        },
                        {
                          label: "Edit",
                          href: `/${from}/paid-to/${payment._id}/edit`,
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDelete(payment._id),
                        },
                      ]}
                    />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={PaymentsModal} onClose={() => setPaymentModal(false)}>
        <PaymentDetailsModal
          id={currentId}
          onClose={() => setPaymentModal(false)}
        />
      </Modal>
    </>
  );
}

// StatusCell component refactored for clarity and consistency
// const StatusCell = ({ payment }) => {
//   // Assuming payment.id is the correct ID to use for updating
//   const updateStatusMutation = useUpdatePaidTo(payment.id);

//   // Function to determine the color class
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "complete":
//         return "bg-success";
//       case "incomplete":
//         return "bg-brand";
//       case "owed":
//         return "bg-[#A88AED]";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <Td>
//       <div className="relative">
//         {/* Colored dot */}
//         <div
//           className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-10 ${getStatusColor(
//             payment.status
//           )}`}
//         ></div>

//         {/* Dropdown */}
//         <Dropdown
//           options={["complete", "incomplete", "Owed"]} // Ensure options match backend values
//           value={payment.status}
//           onChange={(val) => updateStatusMutation.mutate({ status: val })}
//           className="pl-8 h-10 bg-divider w-30 rounded-sm border-text2"
//         />
//       </div>
//     </Td>
//   );
// };

export default PaidTo;
