import Icon from "./Icon";

function ServiceDetailsModal({ onClose }) {
  const serviceDetails = {
    service: "Social Media Page",
    description:
      "Setup for 2 social media accounts (e.g., Facebook & Instagram) Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit nesciunt error quidem modi cupiditate minus, porro at odit recusandae ut aliquid ipsum voluptate assumenda, nulla aliquam aut. Explicabo blanditiis et nam autem perferendis laborum voluptas! Dolor consequuntur neque rerum, voluptatum architecto at aliquid laborum hic dicta tempore quibusdam vero animi.",
    clientsPay: "$78.00",
    teamsPayment: "$14.00",
    teamMember: {
      name: "Akash",
      role: "Marketing Head",
    },
    addons: "----",
  };
  return (
    <div className="w-full max-h-200 md:w-200 lg:max-h-[900px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Company Details</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 mt-4 flex flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2 overflow-y-scroll">
        <InfoItem label="Service" value={serviceDetails.service} />
        <InfoItem label="Description" value={serviceDetails.description} />
        <InfoItem label="Client's Pay" value={serviceDetails.clientsPay} />
        <InfoItem label="Team's Payment" value={serviceDetails.teamsPayment} />
        <InfoItem label="Team Member">
          <UserCard
            name={serviceDetails.teamMember.name}
            role={serviceDetails.teamMember.role}
          />
        </InfoItem>
        <InfoItem label="addons" value={serviceDetails.addons} />
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

export default ServiceDetailsModal;
