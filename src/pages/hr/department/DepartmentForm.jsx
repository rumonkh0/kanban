import ClientSelect from "@/components/ClientSelect";
import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  Back,
  Icon,
} from "@/components/Component";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";

function DepartmentForm({ title, edit }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <PageTitle title={title || "Add Department"} />
      <div className="flex flex-col gap-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Add Department</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <FormField label="Department Name" required>
              <Input placeholder="Project Manager" />
            </FormField>
            <ClientSelect label="Select Members" />
            <FormField label="Designation">
              <Dropdown
                options={["Design", "Developer", "Manager"]}
                value={formData.department}
                onChange={(val) => handleChange("department", val)}
              />
            </FormField>
          </form>
        </div>
        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton>Save</RedButton>
              <RedBorderButton>Cancel</RedBorderButton>
            </div>

            <RedButton>Delete</RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton>Save</RedButton>
              <RedBorderButton>Save & Add More</RedBorderButton>
            </div>

            <RedButton>Cancel</RedButton>
          </div>
        )}
      </div>
    </>
  );
}

export default DepartmentForm;
