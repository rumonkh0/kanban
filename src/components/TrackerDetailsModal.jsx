import { FormatDate } from "../utils/utils";
import { ImageName } from "./Component";
import Icon from "./Icon";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function TrackerModal({ tracker, onClose }) {
  // const tracker = {
  //   CompanyName: "TechCorp Ltd",
  //   Client: {
  //     name: "Akash",
  //     role: "Marketing Head",
  //   },
  //   TeamMemberAssigned: {
  //     name: "Akash",
  //     role: "Marketing Head",
  //   },
  //   ProjectName: "Website Redesign",
  //   Description:
  //     "Complete redesign of company website Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius iure unde aliquid fugiat itaque aspernatur vero libero numquam. Recusandae, sed. Perferendis, eos nam. Quod perspiciatis reiciendis laudantium natus incidunt eaque dolor dolore magnam quia ducimus beatae, consequatur, recusandae perferendis repellat.",
  //   Start: "2025-07-10",
  //   DueDate: "2025-08-15",
  //   Status: "In Progress",
  //   Price: 1500,
  //   CustomPrice: 1400,
  //   Discount: 100,
  //   FinalAmountForClient: 1400,
  //   ModeOfPayment: "Stripe",
  //   PaymentDate: "2025-08-05",
  //   AmountPaid: 1000,
  //   AmountOwedByClient: 400,
  //   PayableAmountToMember: 1000,
  //   DatePaidToMember: "2025-08-10",
  //   AmountPaidToMember: 500,
  //   AmountOwedToMember: 500,
  //   AmountEarned: 900,
  //   AmountClaimed: 0,
  // };

  return (
    <div className="w-full h-200 md:w-200 lg:max-h-[900px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Team Payment Details</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 mt-4 flex flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2 overflow-y-scroll">
        <InfoItem label="Company Name" value={tracker.companyName} />

        <InfoItem label="Client">
          <ImageName
            image={
              tracker.client?.profilePicture?.filePath
                ? `${baseURL}/${tracker.client?.profilePicture.filePath}`
                : "/images/profile.png"
            }
            username={tracker.client?.name}
            // designation={tracker.Client}
          />
        </InfoItem>

        <InfoItem label="Employee Assigned">
          <Members members={tracker.members} />
        </InfoItem>

        <InfoItem label="Project Name" value={tracker.projectName} />
        <InfoItem label="Project Description" value={tracker.description} />
        <InfoItem label="Start Date" value={FormatDate(tracker.startDate)} />
        <InfoItem label="Due Date" value={FormatDate(tracker.dueDate)} />
        <InfoItem label="Status">
          <div className="w-30 border border-text2 rounded-sm flex items-center p-3 gap-2 typo-b3">
            <p
              className={`w-2 h-2 rounded-full ${
                tracker.status === "Completed"
                  ? "bg-success"
                  : tracker.status === "On Hold"
                  ? "bg-brand"
                  : tracker.status === "Active"
                  ? "bg-[#5EB7E0]"
                  : ""
              }`}
            ></p>
            {tracker.status}
          </div>
        </InfoItem>
        <InfoItem label="Price" value={"$" + tracker.projectPrice} />
        <InfoItem label="Custom Price" value={"$" + tracker.customPrice} />
        <InfoItem label="Discount" value={tracker.discount} />
        <InfoItem
          label="Final Amount For Client"
          value={"$" + tracker.finalAmountForClient}
        />
        <InfoItem label="Mode of Payment" value={tracker.modeOfPayment} />
        {/* <InfoItem label="Date Paid By the Client" value={tracker.PaymentDate} /> */}
        <InfoItem
          label="Amount Paid By Client"
          value={"$" + tracker.amountPaidByClient}
        />
        <InfoItem
          label="Amount Owed By Client"
          value={"$" + tracker.amountOwedByClient}
        />
        <InfoItem
          label="Amount Payable To Members"
          value={"$" + tracker.amountPayableToMembers}
        />
        {/* <InfoItem
          label="Date Paid To The Members"
          value={tracker.DatePaidToMember}
        /> */}
        <InfoItem
          label="Amount Paid To Members"
          value={"$" + tracker.amountPaidToMembers}
        />
        <InfoItem
          label="Amount Owed To Members"
          value={"$" + tracker.amountOwedToMembers}
        />
        <InfoItem
          label="Final Amount Earned"
          value={tracker.amountPaidByClient - tracker.amountPaidToMembers}
        />
        {/* <InfoItem label="Amount Claimed" value={tracker.AmountClaimed} /> */}
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
      <span className="sm:ml-0 mt-0.5">{value ?? children ?? "--------"}</span>
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

function Members({ members }) {
  if (!members || members.length === 0) return "-------";

  // ✅ Only 1 member → avatar + name
  if (members.length === 1) {
    const m = members[0];
    const memberImage = m?.profilePicture?.filePath
      ? `${baseURL}/${m.profilePicture.filePath}`
      : "/images/profile.png";
    return <ImageName image={memberImage} username={m.name} />;
  }

  return (
    <div className="flex -space-x-3">
      {members.slice(0, 5).map((m, idx) => {
        const memberImage = m?.profilePicture?.filePath
          ? `${baseURL}/${m.profilePicture.filePath}`
          : "/images/profile.png";

        return (
          <img
            key={idx}
            src={memberImage}
            alt={m?.name || `member ${idx}`}
            title={m?.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
        );
      })}
      {members.length > 5 && (
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xs text-gray-700 border-2 border-white">
          +{members.length - 5}
        </span>
      )}
    </div>
  );
}

export default TrackerModal;
