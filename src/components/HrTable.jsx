import React, { useState } from "react";
import { Link } from "react-router";
import Icon from "@/components/Icon";
import { ImageName, Table, Td, Th, Thead } from "./Component";
import DropdownMenu from "./DropdownMenu";

function ClientTable() {
  const teamMembers = [
    {
      membersId: "EMP-12",
      name: "Prof. Toni Swift",
      email: "malinda.lowe@example.net2",
      role: "Team Member",
      joiningDate: "Aug 13, 2025",
      currentTask: 1,
      status: "Active",
      action: "",
    },
    {
      membersId: "EMP-12",
      name: "Pasquale O'Connell",
      email: "gabriel49@example.org1",
      role: "Team",
      joiningDate: "Aug 13, 2025",
      currentTask: 0,
      status: "Unavailable",
      action: "",
    },
    {
      membersId: "EMP-12",
      name: "Mrs. Angela Bechtelar Jr.",
      email: "zboncak.jack@example.net5",
      role: "Manager",
      joiningDate: "Aug 13, 2025",
      currentTask: 1,
      status: "Active",
      action: "",
    },
  ];
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <Table>
      <Thead>
        <tr className="text-left">
          <Th title="Members ID" />
          <Th title="Name" />
          <Th title="Email" />
          <Th title="Role" />
          <Th title="Joining Date" />
          <Th title="Current Task" />
          <Th title="Status" />
          <Th title="Action" />
        </tr>
      </Thead>
      <tbody>
        {teamMembers.map((teamMember, index) => (
          <tr
            key={index}
            className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
          >
            {/* Client Name with Avatar */}
            <Td className="first:rounded-l-[4px]" data={teamMember.membersId} />
            <Td>
              <Link href="/hr/team-members/member-details">
                <ImageName
                  image="/images/profile.png"
                  username={teamMember.name}
                />
              </Link>
            </Td>
            <Td data={teamMember.email} />
            <Td>
              <div className="w-full h-10 flex items-center justify-between px-2 gap-2 border border-text2 rounded-sm">
                <div className="typo-b3">{teamMember.role}</div>
                <div>
                  <Icon name="arrow" />
                </div>
              </div>
            </Td>

            <Td data={teamMember.joiningDate} />
            <Td data={teamMember.currentTask} />
            <Td>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    teamMember.status === "Active" ? "bg-success" : "bg-brand"
                  }`}
                ></div>
                <div className="typo-b3">{teamMember.status}</div>
              </div>
            </Td>
            <Td className="text-left last:rounded-r-[4px]">
              <button
                onClick={(e) => handleMenuClick(index, e)}
                className="relative p-2 cursor-pointer hover:bg-surface2/60 border border-text2 rounded-sm"
              >
                <Icon name="menu" size={20} />
                <DropdownMenu
                  isOpen={activeMenu === index}
                  onClose={() => setActiveMenu(null)}
                  menuItems={[
                    { label: "View", href: "/hr/team-members/member-details" },
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
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClientTable;
