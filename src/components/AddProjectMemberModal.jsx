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
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Add Project Member</h2>{" "}
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

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
        // disabled={!!formData.service}
      />
      <div className="flex justify-between pt-4">
        <RedButton
          onClick={() =>
            toast.promise(
              updateProject.mutateAsync(
                { members: formData },
                {
                  onSuccess: () => onClose(),
                }
              ),
              {
                pending: "Updating Membe List",
                success: "Member List Updatet",
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
        </RedButton>{" "}
        <RedBorderButton>Cancel</RedBorderButton>
      </div>
    </div>
  );
}

export default AddProjectMemberModal;
