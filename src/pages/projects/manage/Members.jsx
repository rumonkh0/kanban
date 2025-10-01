import { RedButton } from "@/components/Component";
import { Link, useParams } from "react-router";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { useState } from "react";
import AddProjectMemberModal from "@/components/AddProjectMemberModal";
import {
  useProjectMembers,
  useRemoveProjectMember,
} from "../../../hooks/useProjects";
import { ImageName, Td, Th } from "../../../components/Component";
import { Bin } from "../../../components/Icon";
import { useUpdateProjectMember } from "../../../hooks/useProjectMembers";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function Members() {
  const { id } = useParams();
  const [projectMemberModal, setProjectMemberModal] = useState(false);
  const { data: projectMembers, isPending, isError } = useProjectMembers(id);
  const { mutate: removeProjectMember } = useRemoveProjectMember(id);

  if (isPending) {
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
              {/* <th className="typo-b3 text-text2 py-3 px-4">#</th> */}
              <Th title="Name" />
              <Th title="Have to pay" />
              <Th
                title="
                Amount to pay members"
              />
              <Th
                title="
                Amount owed To member"
              />
              <Th title="Use Role" />
              <Th title="action" />
            </tr>
          </thead>
          <tbody>
            {projectMembers.map((member) => {
              const memberImage = member.freelancer?.profilePicture?.filePath
                ? `${baseURL}/${member.freelancer.profilePicture?.filePath}`
                : "/images/profile.png";
              return (
                <tr
                  key={member._id}
                  className="h-16 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                >
                  {/* <Td data={member.id} className="first:rounded-l-[4px]"></Td> */}
                  {/* Name */}
                  <Td>
                    <ImageName
                      className="first:rounded-l-[4px]"
                      username={member.freelancer.name}
                      image={memberImage}
                    />
                  </Td>

                  {/* Have to pay */}
                  <Td className="py-2 px-4 bg-divider">
                    <EditableCell
                      memberId={member._id}
                      field="haveToPay"
                      value={member.haveToPay}
                    />
                  </Td>

                  {/* Amount to pay members */}
                  <Td className="py-2 px-4 bg-divider">
                    <EditableCell
                      memberId={member.id}
                      field="amountToMembers"
                      value={member.amountPaid}
                      disabled
                    />
                  </Td>

                  {/* Amount owed to member */}
                  <Td className="py-2 px-4 bg-divider">
                    <EditableCell
                      memberId={member.id}
                      field="amountOwed"
                      value={member.amountOwed}
                      disabled
                    />
                  </Td>

                  {/* Role */}
                  <Td className="py-2 px-4 bg-divider">{member.role}</Td>

                  {/* Delete button */}
                  <Td className="py-2 px-4 text-left last:rounded-r-[4px] bg-divider">
                    <button
                      onClick={() => removeProjectMember(member.freelancer._id)}
                      className="p-2 border border-text2 rounded-sm cursor-pointer hover:bg-brand/20 hover:text-brand group"
                    >
                      <Bin className="text-text2 group-hover:text-brand" />
                    </button>
                  </Td>
                </tr>
              );
            })}
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

const EditableCell = ({ memberId, field, value, disabled = false }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  const mutation = useUpdateProjectMember(memberId);

  const submit = () => {
    setEditing(false);
    if (val !== value) {
      toast.promise(
        mutation.mutateAsync({ [field]: val }),
        {
          pending: "Updating Member Data",
          success: "Member Updatet",
          error: {
            render({ data }) {
              const errorMessage =
                data.response?.data?.message ||
                data.response?.data?.error ||
                data.message ||
                "Failed to post comment.";
              return errorMessage;
            },
          },
        },
        { autoClose: 5000 }
      );
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
      onClick={disabled ? undefined : () => setEditing(true)}
    >
      <span className="mr-1">$</span>
      {val}
    </div>
  );
};

export default Members;
