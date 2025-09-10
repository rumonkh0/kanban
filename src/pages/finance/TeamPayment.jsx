import { useState } from "react";
import Icon from "@/components/Icon";
import { Link } from "react-router";
import Modal from "@/components/Modal";
import PaymentDetailsModal from "@/components/PaymentDetailsModal";
import DropdownMenu from "@/components/DropdownMenu";
function PaidTo({ toHref }) {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const payment = [
    {
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

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
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
            to={toHref}
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Paid To
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <th className="typo-b3 text-text2 py-3 ">Project</th>
              <th className="typo-b3 text-text2 py-3 ">Paid To</th>
              <th className="typo-b3 text-text2 py-3 ">To Be Paid</th>
              <th className="typo-b3 text-text2 py-3 ">Payment Date</th>
              <th className="typo-b3 text-text2 py-3 ">Amount Paid</th>
              <th className="typo-b3 text-text2 py-3 ">Amount Owed</th>
              <th className="typo-b3 text-text2 py-3 ">Payment Method</th>
              <th className="typo-b3 text-text2 py-3 ">Status</th>
              <th className="typo-b3 text-text2 py-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((project, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <td className="typo-b2 pl-4 text-text  first:rounded-l-[4px] bg-divider">
                  Social Media Page Setup Basic Package
                </td>

                <td className=" bg-divider">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="client"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="typo-b2">{project.paidTo.name}</h2>
                      <p className="typo-b3 text-text2">
                        {project.paidTo.role}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="typo-b2 text-text  bg-divider">
                  ${toTwoDecimal("50")}
                </td>

                <td className="typo-b2 text-text  bg-divider">
                  {formatDate(project.paymentDate)}
                </td>

                <td className="typo-b2 text-success  bg-divider">
                  ${toTwoDecimal("40")}
                </td>

                <td className="typo-b2 text-brand  bg-divider">
                  ${toTwoDecimal("40")}
                </td>

                <td className="typo-b2 text-text  bg-divider">Stripe</td>

                <td className="typo-b2 text-text py-2 bg-divider">
                  <div className="w-31 h-10 flex items-center justify-center gap-2 border border-text2 rounded-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="typo-b3">complete</div>
                    <div>
                      <Icon name="arrow" />
                    </div>
                  </div>
                </td>

                <td className="last:rounded-r-[4px] bg-divider ">
                  <button
                    onClick={(e) => handleMenuClick(index, e)}
                    className="relative p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60"
                  >
                    <Icon name="menu" size={20} />{" "}
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={[
                        { label: "View", onClick: () => setPaymentModal(true) },
                        {
                          label: "Edit",
                          onClick: () => console.log("Edit clicked"),
                        },
                        {
                          label: "Delete",
                          onClick: () => console.log("Delete clicked"),
                        },
                      ]}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={PaymentsModal} onClose={() => setPaymentModal(false)}>
        <PaymentDetailsModal onClose={() => setPaymentModal(false)} />
      </Modal>
    </>
  );
}

export default PaidTo;
