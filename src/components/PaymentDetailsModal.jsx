import React from "react";
import Icon from "./Icon";
import { usePaidFrom } from "../hooks/useFinance";

function PaymentDetailsModal({ onClose, id }) {
  const { data: paidFromData, isLoading, isError } = usePaidFrom(id);
  if (!id) return null;
  if (isLoading) return <div>Loading details...</div>;
  if (isError) return <div>Failed to load details</div>;
  const paymentDetails = Array.isArray(paidFromData) || {
    project: "Social Media Page Setup Basic Package",
    paidTo: {
      name: "Akash",
      role: "Marketing Head",
    },
    haveToPaid: "$30.00",
    paymentDate: "Aug 25, 2025",
    amountPaid: "$25.00",
    amountOwed: "$5.00",
    paymentMethod: "Stripe",
    status: "Owed",
    invoiceNo: "---",
    invoice: {
      project: "Recruitments",
      format: "PDF",
    },
  };

  return (
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Team Payment Details</h2>
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex mt-4 flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2">
        <InfoItem label="Project" value={paymentDetails.project} />
        <InfoItem label="Paid To (Name)">
          <div className="flex items-center gap-2">
            <img
              src="/images/profile.png"
              alt="client"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="typo-b2">{paymentDetails.paidTo.name}</p>
              <p className="typo-b3 text-text2">{paymentDetails.paidTo.role}</p>
            </div>
          </div>
        </InfoItem>
        <InfoItem label="Have To Pay" value={paymentDetails.haveToPaid} />
        <InfoItem label="Payment Date" value={paymentDetails.paymentDate} />
        <InfoItem
          label="Amount Paid"
          value={paymentDetails.amountPaid}
          text="text-success"
        />
        <InfoItem
          label="Amount Owed"
          value={paymentDetails.amountOwed}
          text="text-brand"
        />
        <InfoItem label="Payment Method" value={paymentDetails.paymentMethod} />
        <InfoItem label="Status" value={paymentDetails.status} />
        <InfoItem label="Invoice No" value={paymentDetails.invoiceNo} />
        <InfoItem label="Invoice Project">
          <div className="w-[184px] h-10 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
            <Icon name="file" size={35} />
            <div className="typo-b3 text-text flex flex-col">
              <h2>Project</h2>
              <p>Requirements.pdf</p>
            </div>
            <Icon name="cross-red" size={16} />
          </div>
        </InfoItem>
      </div>
    </div>
  );
}
const InfoItem = ({ label, value, text, children }) => (
  <div className="flex items-center gap-2">
    <span className="typo-b2 text-text2 w-[200px]">{label}</span>
    <span className={`flex items-center typo-b2`}>
      : &nbsp;{" "}
      <div className={text}>
        {value}
        {children}
      </div>
    </span>
  </div>
);
export default PaymentDetailsModal;
