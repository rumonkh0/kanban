import React, { useState } from "react";
import Icon from "./Icon";
import { RedBorderButton, RedButton } from "./Component";
import ClientSelect from "@/components/ClientSelect";

function AddProjectMemberModal({ onClose }) {
  const [formData, setFormData] = useState({ clients: [] });
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Add Project Member</h2>{" "}
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

      <ClientSelect
        onSelect={(member) =>
          handleChange("members", [...formData.members, member])
        }
        label="Add Project Members"
      />
      <div className="flex justify-between pt-4">
        <RedButton>Save</RedButton> <RedBorderButton>Cancel</RedBorderButton>
      </div>
    </div>
  );
}

export default AddProjectMemberModal;
