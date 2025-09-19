import { RedButton } from "@/components/Component";
import { Link, useParams } from "react-router";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useState } from "react";
import AddProjectMemberModal from "@/components/AddProjectMemberModal";
import {
  useProjectMembers,
  useRemoveProjectMember,
  useUpdateProjectMember,
} from "../../../hooks/useProjects";
import { ImageName, Td } from "../../../components/Component";
import { Bin } from "../../../components/Icon";

function Members() {
  const { id } = useParams();
  const [projectMemberModal, setProjectMemberModal] = useState(false);
  const {
    data: projectsMembersData,
    isLoading,
    isError,
  } = useProjectMembers(id);
  const { mutate: removeProjectMember } = useRemoveProjectMember(id);
  const projectMembers = Array.isArray(projectsMembersData) || [
    {
      id: 1,
      name: "John Doe",
      haveToPay: 1000,
      amountToMembers: 400,
      amountOwed: 200,
      image: "/images/profile.png",
      role: "Designer",
    },
    {
      id: 2,
      name: "Jane Smith",
      haveToPay: 1500,
      amountToMembers: 600,
      amountOwed: 300,
      image: "/images/profile.png",
      role: "Developer",
    },
    {
      id: 3,
      name: "Alice Johnson",
      haveToPay: 2000,
      amountToMembers: 800,
      amountOwed: 400,
      image: "/images/profile.png",
      role: "Project Manager",
    },
    {
      id: 4,
      name: "Bob Williams",
      haveToPay: 1200,
      amountToMembers: 500,
      amountOwed: 250,
      image: "/images/profile.png",
      role: "QA",
    },
    {
      id: 5,
      name: "Emma Brown",
      haveToPay: 1800,
      amountToMembers: 700,
      amountOwed: 350,
      image: "/images/profile.png",
      role: "Designer",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading projects</div>;
  }
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
            {projectMembers.map((member) => (
              <tr
                key={member.id}
                className="h-16 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td data={member.id}></Td>
                {/* Name */}
                <Td>
                  <ImageName username={member.name} image={member.image} />
                </Td>

                {/* Have to pay */}
                <td className="py-2 px-4 bg-divider">
                  <EditableCell
                    memberId={member.id}
                    field="haveToPay"
                    value={member.haveToPay}
                  />
                </td>

                {/* Amount to pay members */}
                <td className="py-2 px-4 bg-divider">
                  <EditableCell
                    memberId={member.id}
                    field="amountToMembers"
                    value={member.amountToMembers}
                  />
                </td>

                {/* Amount owed to member */}
                <td className="py-2 px-4 bg-divider">
                  <EditableCell
                    memberId={member.id}
                    field="amountOwed"
                    value={member.amountOwed}
                  />
                </td>

                {/* Role */}
                <td className="py-2 px-4 bg-divider">{member.role}</td>

                {/* Delete button */}
                <td className="py-2 px-4 text-left last:rounded-r-[4px] bg-divider">
                  <button
                    onClick={() => removeProjectMember(member.id)}
                    className="p-2 border border-text2 rounded-sm cursor-pointer hover:bg-brand/20 hover:text-brand group"
                  >
                    <Bin className="text-text2 group-hover:text-brand" />
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

const EditableCell = ({ memberId, field, value }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const mutation = useUpdateProjectMember(memberId);

  const submit = () => {
    setEditing(false);
    if (val !== value) {
      mutation.mutate({ [field]: val });
    }
  };

  return editing ? (
    <div className="flex items-center border border-text2 rounded-sm w-[155px] h-10 pl-1">
      <span className="px-2">$</span>
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={submit}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        autoFocus
        className="w-full h-full outline-none border-none pl-1 -mr-1 typo-b3"
        style={{ MozAppearance: "textfield" }} // remove spinner for Firefox
      />
    </div>
  ) : (
    <div
      className="flex items-center w-[155px] h-10 border border-text2 pl-2 rounded-sm typo-b3 cursor-pointer"
      onClick={() => setEditing(true)}
    >
      <span className="mr-1">$</span>
      {val}
    </div>
  );
};

export default Members;
