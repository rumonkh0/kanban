import React, { useState } from "react";
import { Link } from "react-router";
import Icon from "@/components/Icon";
import { ImageName, Table, Td, Th, Thead } from "./Component";
import DropdownMenu from "./DropdownMenu";
import { useDeleteTeamMember, useTeamMembers } from "../hooks/useTeam";

// format date helper
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function TeamMembersTable({ filters }) {
  // const teamMembers = [
  //   {
  //     membersId: "EMP-12",
  //     name: "Prof. Toni Swift",
  //     email: "malinda.lowe@example.net2",
  //     role: "Team Member",
  //     joiningDate: "Aug 13, 2025",
  //     currentTask: 1,
  //     status: "Active",
  //     action: "",
  //   },
  //   {
  //     membersId: "EMP-12",
  //     name: "Pasquale O'Connell",
  //     email: "gabriel49@example.org1",
  //     role: "Team",
  //     joiningDate: "Aug 13, 2025",
  //     currentTask: 0,
  //     status: "Unavailable",
  //     action: "",
  //   },
  //   {
  //     membersId: "EMP-12",
  //     name: "Mrs. Angela Bechtelar Jr.",
  //     email: "zboncak.jack@example.net5",
  //     role: "Manager",
  //     joiningDate: "Aug 13, 2025",
  //     currentTask: 1,
  //     status: "Active",
  //     action: "",
  //   },
  // ];
  const [activeMenu, setActiveMenu] = useState(null);

  const {
    data: teamMembersData,
    isLoading: teamMembersLoading,
    isError,
  } = useTeamMembers(filters);

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const deleteMember = useDeleteTeamMember();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteMember.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };
  if (isError) return <div>Error loading clients</div>;

  if (teamMembersLoading)
    return <div className="text-center">Data Loading</div>;
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
        {teamMembersData.map((teamMember, index) => (
          <tr
            key={index}
            className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
          >
            {/* Client Name with Avatar */}
            <Td className="first:rounded-l-[4px]" data={teamMember.memberId} />
            <Td>
              <Link to="/hr/team-members/member-details">
                <ImageName
                  image="/images/profile.png"
                  username={teamMember.name}
                />
              </Link>
            </Td>
            <Td data={teamMember.user.email} />
            <Td>
              <div className="w-full h-10 flex items-center justify-between px-2 gap-2 border border-text2 rounded-sm">
                <div className="typo-b3">{teamMember.designation}</div>
                <div>
                  <Icon name="arrow" />
                </div>
              </div>
            </Td>

            <Td data={formatDate(teamMember.joiningDate)} />
            <Td data={teamMember.currentTask || 0} />
            <Td>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    teamMember.accountStatus === "Active"
                      ? "bg-success"
                      : "bg-brand"
                  }`}
                ></div>
                <div className="typo-b3">{teamMember.accountStatus}</div>
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
                    {
                      label: "View",
                      href: `/hr/team-member/${teamMember._id}`,
                    },
                    {
                      label: "Edit",
                      href: `/hr/team-member/${teamMember._id}/edit`,
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDelete(teamMember._id),
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

export default TeamMembersTable;
