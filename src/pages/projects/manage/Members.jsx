import { RedButton } from "@/components/Component";
import { Link } from "react-router";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useState } from "react";
import AddProjectMemberModal from "@/components/AddProjectMemberModal";

function Members() {
  const [projectMemberModal, setProjectMemberModal] = useState(false);
  const clients = [
    {
      clientName: "Gustave Koeipin",
      email: "caitlyn66@example.net7",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Prof. Toni Swift",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Brayan Gutkowski",
      email: "raul.dicki@example.com7",
      project: "Corporate Website Revamp",
      status: "Active",
      assignedTo: "Pasquale O'Connell",
      lastUpdate: "Aug 3, 2025",
    },
    {
      clientName: "Lavon Effertz",
      email: "eklocko@example.com2",
      project: "E-Commerce Platform",
      status: "Active",
      assignedTo: "Mrs. Angela Bechtelar Jr.",
      lastUpdate: "Jul 30, 2025",
    },
    {
      clientName: "Brycen Sipes",
      email: "rickey87@example.com8",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Celia Jast",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Randy Botsford Jr.",
      email: "abshire.keenan@example.net7",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Mrs. Yesenia Shields",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Miss Esmeralda Gerhold",
      email: "gkautzer@example.net8",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Quinton Kemmer",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Rusty Mills II",
      email: "hortense.bode@example.org6",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Fabian Breitenberg DDS",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Ms. Maybell Orn Jr.",
      email: "douglas.beau@example.com3",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Mr. Wilton Nader",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Dr. Eldora Emard",
      email: "creinger@example.net9",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Cecil Franecki",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Mrs. Eulalia Casper",
      email: "client@example.com",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "EMP-3 Dr. Alfred Stark",
      lastUpdate: "Aug 6, 2025",
    },
  ];
  return (
    <div>
      <div className="flex gap-4 cursor-pointer mb-4">
        <RedButton
          onClick={() => setProjectMemberModal(true)}
          className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
        >
          <div className="w-6 h-6 flex justify-center items-center">
            <Icon name="plus" size={15} />
          </div>
          Add Project Members
        </RedButton>
      </div>

      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <th className="typo-b3 text-text2 py-3 px-4">#</th>
              <th className="typo-b3 text-text2 py-3 px-4">Name</th>
              <th className="typo-b3 text-text2 py-3 px-4">Have to pay</th>
              <th className="typo-b3 text-text2 py-3 px-4">
                Amount to pay members
              </th>
              <th className="typo-b3 text-text2 py-3 px-4">
                Amount owed To member
              </th>
              <th className="typo-b3 text-text2 py-3 px-4">Use Role</th>
              <th className="typo-b3 text-text2 py-3 px-4">action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((project, index) => (
              <tr
                key={index}
                className="h-16 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                {/* Client Name with Avatar */}
                <td className="typo-b2 text-text py-2 px-4 first:rounded-l-[4px] bg-divider">
                  #
                </td>
                <td className="py-2 px-4 bg-divider">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="client"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="typo-b2 text-text">
                      {project.clientName}
                    </span>
                  </div>
                </td>

                <td className=" text-text py-2 px-4 bg-divider">
                  <div className="flex items-center w-[155px] h-10 border border-text2 pl-4 rounded-sm typo-b3">
                    $400
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-2 px-4 bg-divider">
                  <div className="flex items-center w-[155px] h-10 border border-text2 pl-4 rounded-sm typo-b3">
                    $400
                  </div>
                </td>

                <td className="typo-b2 text-text py-2 px-4 bg-divider">
                  <div className="flex items-center w-[155px] h-10 border border-text2 pl-4 rounded-sm typo-b3 text-brand">
                    $400
                  </div>
                </td>

                {/* Assigned To with Avatar */}
                <td className="py-2 px-4 bg-divider">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="assigned"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="typo-b2 text-text">
                      {project.assignedTo}
                    </span>
                  </div>
                </td>

                <td className="py-2 px-4 text-left last:rounded-r-[4px] bg-divider">
                  <button className="p-2 border border-text2 rounded-sm cursor-pointer hover:bg-surface2/60">
                    <Icon name="delete" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={projectMemberModal}
        onClose={() => setProjectMemberModal(false)}
      >
        <AddProjectMemberModal onClose={() => setProjectMemberModal(false)} />
      </Modal>
    </div>
  );
}

export default Members;
