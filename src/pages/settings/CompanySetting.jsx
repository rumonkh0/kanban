import { FormField, Input, RedButton } from "../../components/Component";
import { useState, useEffect } from "react";

import {
  useCompanySetting,
  useEditCompanySetting,
} from "../../hooks/useSettings";
import { toast } from "react-toastify";

function CompanySetting() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { data: companyData, isLoading: isLoadingCompany } =
    useCompanySetting();

  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.companyName || "",
        companyEmail: companyData.companyEmail || "",
        companyPhone: companyData.companyPhone || "",
        companyWebsite: companyData.companyWebsite || "",
      });
    }
  }, [companyData]);

  const updateMutation = useEditCompanySetting();

  const isLoading = updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.companyName ||
      !formData.companyEmail ||
      !formData.companyPhone
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    updateMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Company settings updated successfully!");
      },
      onError: (error) => {
        toast.error(
          "Error updating company settings:",
          error.message ||
            error.response?.data?.error ||
            error.response?.data?.error
        );
      },
    });
  };

  if (isLoadingCompany) {
    return <div>Loading company settings...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Company Settings</div>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Company Name" required>
              <Input
                placeholder="Enter Name"
                value={formData.companyName}
                onChange={(val) => handleChange("companyName", val)}
              />
            </FormField>
            <FormField label="Company Email" required>
              <Input
                placeholder="Enter Email"
                value={formData.companyEmail}
                onChange={(val) => handleChange("companyEmail", val)}
              />
            </FormField>
            <FormField label="Company Phone" required>
              <Input
                placeholder="Enter Phone"
                value={formData.companyPhone}
                onChange={(val) => handleChange("companyPhone", val)}
              />
            </FormField>
            <FormField
              label="Company Website"
              className="md:col-span-2 lg:col-span-3"
            >
              <Input
                placeholder="Enter website"
                value={formData.companyWebsite}
                onChange={(val) => handleChange("companyWebsite", val)}
              />
            </FormField>
          </form>
        </div>
      </div>
      <div>
        <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </RedButton>
      </div>
    </div>
  );
}

export default CompanySetting;
