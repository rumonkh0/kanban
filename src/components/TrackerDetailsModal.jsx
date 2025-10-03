import Icon from "./Icon";

function TrackerDetailsModal({ onClose }) {
  const trackerDetails = {
    CompanyName: "TechCorp Ltd",
    Client: {
      name: "Akash",
      role: "Marketing Head",
    },
    TeamMemberAssigned: {
      name: "Akash",
      role: "Marketing Head",
    },
    ProjectName: "Website Redesign",
    Description:
      "Complete redesign of company website Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius iure unde aliquid fugiat itaque aspernatur vero libero numquam. Recusandae, sed. Perferendis, eos nam. Quod perspiciatis reiciendis laudantium natus incidunt eaque dolor dolore magnam quia ducimus beatae, consequatur, recusandae perferendis repellat.",
    Start: "2025-07-10",
    DueDate: "2025-08-15",
    Status: "In Progress",
    Price: 1500,
    CustomPrice: 1400,
    Discount: 100,
    FinalAmountForClient: 1400,
    ModeOfPayment: "Stripe",
    PaymentDate: "2025-08-05",
    AmountPaid: 1000,
    AmountOwedByClient: 400,
    PayableAmountToMember: 1000,
    DatePaidToMember: "2025-08-10",
    AmountPaidToMember: 500,
    AmountOwedToMember: 500,
    AmountEarned: 900,
    AmountClaimed: 0,
  };

  return (
    <div className="w-full h-200 md:w-200 lg:max-h-[900px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Team Payment Details</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 mt-4 flex flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2 overflow-y-scroll">
        <InfoItem label="Company Name" value={trackerDetails.CompanyName} />

        <InfoItem label="Client">
          <UserCard
            name={trackerDetails.Client.name}
            role={trackerDetails.Client.role}
          />
        </InfoItem>

        <InfoItem label="Employee Assigned">
          <UserCard
            name={trackerDetails.TeamMemberAssigned.name}
            role={trackerDetails.TeamMemberAssigned.role}
          />
        </InfoItem>

        <InfoItem label="Project Name" value={trackerDetails.ProjectName} />
        <InfoItem
          label="Project Description"
          value={trackerDetails.Description}
        />
        <InfoItem label="Start Date" value={trackerDetails.Start} />
        <InfoItem label="Due Date" value={trackerDetails.DueDate} />
        <InfoItem label="Status" value={trackerDetails.Status} />
        <InfoItem label="Price" value={trackerDetails.Price} />
        <InfoItem label="Custom Price" value={trackerDetails.CustomPrice} />
        <InfoItem label="Discount" value={trackerDetails.Discount} />
        <InfoItem
          label="Final Amount For Client"
          value={trackerDetails.FinalAmountForClient}
        />
        <InfoItem
          label="Mode of Payment"
          value={trackerDetails.ModeOfPayment}
        />
        <InfoItem
          label="Date Paid By the Client"
          value={trackerDetails.PaymentDate}
        />
        <InfoItem
          label="Amount Paid By Client"
          value={trackerDetails.AmountPaid}
        />
        <InfoItem
          label="Amount Owed By Client"
          value={trackerDetails.AmountOwedByClient}
        />
        <InfoItem
          label="Amount Payable To Members"
          value={trackerDetails.PayableAmountToMember}
        />
        <InfoItem
          label="Date Paid To The Members"
          value={trackerDetails.DatePaidToMember}
        />
        <InfoItem
          label="Amount Paid To Members"
          value={trackerDetails.AmountPaidToMember}
        />
        <InfoItem
          label="Amount Owed To Members"
          value={trackerDetails.AmountOwedToMember}
        />
        <InfoItem
          label="Final Amount Earned"
          value={trackerDetails.AmountEarned}
        />
        <InfoItem label="Amount Claimed" value={trackerDetails.AmountClaimed} />
      </div>
    </div>
  );
}

const InfoItem = ({ label, value, text, children }) => (
  <div className="flex flex-col sm:flex-row items-start gap-0 sm:gap-2">
    <span className="typo-b2 text-text2 w-full sm:w-auto sm:min-w-[250px] font-semibold">
      {label}
    </span>
    <span className={`flex-1 flex items-start typo-b2 sm:mt-0 ${text || ""}`}>
      <span className="hidden sm:inline">: &nbsp;</span>
      <span className="sm:ml-0 mt-0.5">{value ?? children}</span>
    </span>
  </div>
);

const UserCard = ({ name, role }) => (
  <div className="flex items-center gap-2">
    <img
      src="/images/profile.png"
      alt={name}
      className="w-8 h-8 rounded-full object-cover"
    />
    <div>
      <p className="typo-b2">{name}</p>
      <p className="typo-b3 text-text2">{role}</p>
    </div>
  </div>
);

export default TrackerDetailsModal;
