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
} from "../../components/Component";
import {
  useDeletePaidTo,
  usePaidTos,
  useUpdatePaidTo,
} from "../../hooks/useFinance";
function PaidTo({ from }) {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
  });
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const deletePaidTo = useDeletePaidTo();
  const handleDelete = (id) => {
    deletePaidTo.mutate(id, {
      onSuccess: () => {
        console.log(`Deleted payment with id: ${id}`);
      },
      onError: (error) => {
        console.error("Failed to delete:", error);
      },
    });
  };

  const { data: paidToData, isLoading, isError } = usePaidTos(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading clients</div>;
  }
  const payments = Array.isArray(paidToData) || [
    {
      id: 1,
      project: "Social Media Page Setup Basic Package",
      paidTo: {
        name: "Akash",
        role: "Marketing Head",
      },
      toBePaid: 30.0,
      paymentDate: "2025-08-25",
      amountPaid: 25.0,
      amountOwed: 5.0,
      paymentMethod: "Stripe",
      status: "Owed",
    },
    {
      id: 2,
      project: "Social Media Management Standard",
      paidTo: {
        name: "Akash",
        role: "Marketing Head",
      },
      toBePaid: 5.0,
      paymentDate: "2025-08-25",
      amountPaid: 5.0,
      amountOwed: 0.0,
      paymentMethod: "Stripe",
      status: "Paid",
    },
  ];

  function toTwoDecimal(num) {
    const n = parseFloat(num);
    if (isNaN(n)) return "0.00";
    return n.toFixed(2);
  }
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to={`/${from}/paid-to`}
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Paid To
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <FilterDropdown
            label="Status"
            options={["complete", "incomplete"]}
            value={filters.status}
            onSelect={(value) => handleFilterChange("status", value)}
            className="h-8"
          />
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
              <Th title="Status" />
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment.id}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td className="first:rounded-l-[4px]" data={payment.project} />
                <Td>
                  <ImageName
                    image={"/images/profile.png"}
                    username={payment.paidTo.name}
                    designation={payment.paidTo.role}
                  />
                </Td>
                <Td>${toTwoDecimal(payment.toBePaid)}</Td>
                <Td>{formatDate(payment.paymentDate)}</Td>
                <Td>${toTwoDecimal(payment.amountPaid)}</Td>
                <Td>${toTwoDecimal(payment.amountOwed)}</Td>
                <Td>{payment.paymentMethod}</Td>
                <StatusCell payment={payment} />
                <Td className="last:rounded-r-[4px]">
                  <button
                    onClick={(e) => handleMenuClick(index, e)}
                    className="relative p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60"
                  >
                    <Icon name="menu" size={20} />
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={[
                        {
                          label: "View",
                          onClick: () => {
                            setCurrentId(payment.id);
                            setPaymentModal(true);
                          },
                        },
                        {
                          label: "Edit",
                          href: `/${from}/paid-to/${payment.id}/edit`,
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDelete(payment.id),
                        },
                      ]}
                    />
                  </button>
                </Td>
              </tr>
            ))}
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

const StatusCell = ({ payment }) => {
  const updateStatusMutation = useUpdatePaidTo(payment.id);

  return (
    <Td>
      <div className="relative">
        {/* Colored dot */}
        <div
          className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-10 ${
            payment.status === "complete"
              ? "bg-success"
              : payment.status === "Incomplete"
              ? "bg-brand"
              : payment.status === "Owed"
              ? "bg-[#A88AED]"
              : ""
          }`}
        ></div>

        {/* Dropdown */}
        <Dropdown
          options={["Owed", "complete", "Incomplete"]}
          value={payment.status}
          onChange={(val) => updateStatusMutation.mutate({ status: val })}
          className="pl-8 h-10 bg-divider w-30 rounded-sm border-text2"
        />
      </div>
    </Td>
  );
};

export default PaidTo;
