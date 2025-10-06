import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { RedBorderButton, RedButton } from "./Component";
import ClientSelect from "@/components/ClientSelect";
import { useTeamMembers } from "../hooks/useTeam";
import { useProjectMembers, useUpdateProject } from "../hooks/useProjects";
import { useParams } from "react-router";
import { toast } from "react-toastify";

function AddProjectMemberModal({ onClose }) {
  const { id } = useParams();
  const [formData, setFormData] = useState([]);

  const { data: freelancers = [] } = useTeamMembers();
  const { data: members } = useProjectMembers(id);
  const updateProject = useUpdateProject(id);

  useEffect(() => {
    if (members) setFormData(members.map((f) => f.freelancer._id));
  }, [members]);

  return (
    <div className="w-full md:min-w-150 max-w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider mx-auto mt-40 sm:my-8 md:my-12">
      {/* Header */}
      <div className="pb-4 border-b-2 border-divider flex justify-between items-center">
        <h2 className="typo-h4">Add Project Member</h2>
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

      {/* Client Selector */}
      <div className="mt-4">
        <ClientSelect
          value={formData}
          clients={freelancers.map((f) => ({
            id: f._id,
            name: f.name,
            email: f.user.email,
            profilePicture: f.profilePicture,
          }))}
          onChange={(members) => setFormData(members)}
          mode="multi"
          label="Add Project Members"
          addingTitle="Add new member"
          placeHolder="Select Members...."
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <RedButton
          className="w-full px-4 sm:w-auto"
          onClick={() =>
            toast.promise(
              updateProject.mutateAsync(
                { members: formData },
                { onSuccess: () => onClose() }
              ),
              {
                pending: "Updating Member List",
                success: "Member List Updated",
                error: {
                  render({ data }) {
                    const errorMessage =
                      data.response?.data?.message ||
                      data.response?.data?.error ||
                      data.message ||
                      "Failed to update members.";
                    return errorMessage;
                  },
                },
              },
              { autoClose: 5000 }
            )
          }
        >
          Save
        </RedButton>
        <RedBorderButton className="w-full  sm:w-auto" onClick={onClose}>
          Cancel
        </RedBorderButton>
      </div>
    </div>
  );
}

export default AddProjectMemberModal;
