import { useState } from "react";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import PaymentDetailsModal from "@/components/PaymentDetailsModal";
import { Td, Th } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";
import { Link } from "react-router";
import {
  Dropdown,
  FilterDropdown,
  FormatDate,
  ImageName,
  RedButton,
} from "../../components/Component";
import { useDeletePaidFrom, usePaidFroms } from "../../hooks/useFinance";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function Payment({ from }) {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentId, setCurrentId] = useState(null);
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
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const deletePaidFrom = useDeletePaidFrom();
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deletePaidFrom.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };

  const { data: financeData, isLoading, isError } = usePaidFroms(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading clients</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          <Link
            to={`/${from}/paid-by`}
            className="bg-brand rounded-sm flex items-center flex-1 lg:flex-none  justify-center"
          >
            <RedButton>
              <div className="w-6 h-6 flex justify-center items-center">
                <Icon name="plus" size={15} />
              </div>
              Paid From
            </RedButton>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 lg:gap-4 py-1 justify-center lg:justify-end">
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

      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Project" />
              <Th title="Paid From" />
              <Th title="Have To Pay" />
              <Th title="Payment Date" />
              <Th title="Amount Paid" />
              <Th title="Amount Owed" />
              <Th title="Payment Method" />
              {/* <Th title="Status" /> */}
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {financeData.map((payment, index) => {
              const imageUrl = payment.project?.client?.profilePicture?.filePath
                ? `${baseURL}/${payment.project?.client?.profilePicture.filePath}`
                : "/images/profile.png";
              return (
                <tr
                  key={payment._id}
                  className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                >
                  {/* Project Name */}
                  <Td className="first:rounded-l-[4px]">
                    {payment.project?.projectName}
                  </Td>

                  {/* Paid From (Client) */}
                  <Td>
                    <ImageName
                      username={payment.project?.client?.name}
                      designation={payment.project?.client?.user?.email}
                      image={imageUrl}
                    />
                  </Td>

                  {/* Have To Pay */}
                  <Td>${payment.haveToPay}</Td>

                  {/* Payment Date */}
                  <Td>{FormatDate(payment.paymentDate)}</Td>

                  {/* Amount Paid */}
                  <Td className="text-success">${payment.amountPaid}</Td>

                  {/* Amount Owed */}
                  <Td className="text-brand">${payment.amountOwed}</Td>

                  {/* Payment Method */}
                  <Td>{payment.paidMethod}</Td>

                  {/* Status */}
                  {/* <StatusCell payment={payment} /> */}

                  {/* Action Menu */}
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
                          href: `/${from}/paid-by/${payment._id}/edit`,
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
          onClose={() => setPaymentModal(false)}
          id={currentId}
        />
      </Modal>
    </>
  );
}

// const StatusCell = ({ payment }) => {
//   const updateStatusMutation = useUpdatePaidFrom(payment.id);

//   return (
//     <Td>
//       <div className="relative">
//         {/* Colored dot */}
//         <div
//           className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-10 ${
//             payment.status === "Paid"
//               ? "bg-success"
//               : payment.status === "Unpaid"
//               ? "bg-brand"
//               : payment.status === "Owed"
//               ? "bg-[#A88AED]"
//               : ""
//           }`}
//         ></div>

//         {/* Dropdown */}
//         <Dropdown
//           options={["Owed", "Paid", "Unpaid"]}
//           value={payment.status}
//           onChange={(val) => updateStatusMutation.mutate({ status: val })}
//           className="pl-8 h-10 bg-divider w-30 rounded-sm border-text2"
//         />
//       </div>
//     </Td>
//   );
// };

export default Payment;
