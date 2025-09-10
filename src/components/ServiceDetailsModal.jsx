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
    addons: "----"
  };

  return (
    <div className="w-[800px] max-h-[900px] overflow-auto p-4 bg-surface rounded-lg border typo-b2 border-divider">
      {/* Header */}
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Service Details</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

      {/* Content */}
      <div className="flex mt-4 flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2">
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

const InfoItem = ({ label, value, children }) => (
  <div className="flex items-start gap-2">
    <span className="typo-b2 text-text2 w-[200px]">{label}</span>
    <span className={`flex-1 flex items-center  typo-b2`}>
      : &nbsp; {value ?? children}
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
