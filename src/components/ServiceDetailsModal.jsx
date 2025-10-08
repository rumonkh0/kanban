import Icon from "./Icon";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function ServiceDetailsModal({ service, onClose }) {
  return (
    <div className="w-full max-h-200 md:w-200 lg:max-h-[900px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Service Details</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 mt-4 flex flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2 overflow-y-scroll">
        <InfoItem label="Service" value={service.serviceName} />
        <InfoItem label="Description" value={service.description} />
        <InfoItem label="Client's Pay" value={service.clientsPay} />
        <InfoItem label="Team's Payment" value={service.teamsPayment} />
        <InfoItem label="Team Member">
          <Members members={service.freelancers} />
        </InfoItem>
        <InfoItem label="addons" value={service.addons} />
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

// const UserCard = ({ name, role }) => (
//   <div className="flex items-center gap-2">
//     <img
//       src="/images/profile.png"
//       alt={name}
//       className="w-8 h-8 rounded-full object-cover"
//     />
//     <div>
//       <p className="typo-b2">{name}</p>
//       <p className="typo-b3 text-text2">{role}</p>
//     </div>
//   </div>
// );

export default ServiceDetailsModal;
