import {
  Back,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import { useNavigate } from "react-router";

// API Functions
const companyAPI = {
  // Get company settings
  get: async () => {
    const response = await axios.get("/api/settings/company");
    return response.data;
  },

  // Update company settings
  update: async (data) => {
    const response = await axios.put("/api/settings/company", data);
    return response.data;
  },
};

function CompanySetting() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch company settings
  // eslint-disable-next-line no-unused-vars
  const { data: companyData, isLoading: isLoadingCompany } = useQuery({
    queryKey: ["companySettings"],
    queryFn: companyAPI.get,
    onSuccess: (data) => {
      setFormData({
        companyName: data.companyName || "",
        companyEmail: data.companyEmail || "",
        companyPhone: data.companyPhone || "",
        companyWebsite: data.companyWebsite || "",
      });
    },
  });

  // Update company settings mutation
  const updateMutation = useMutation({
    mutationFn: companyAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companySettings"] });
      alert("Company settings updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating company settings:", error);
      alert("Failed to update company settings. Please try again.");
    },
  });

  const isLoading = updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.companyName ||
      !formData.companyEmail ||
      !formData.companyPhone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    updateMutation.mutate(formData);
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
            <FormField label="Company Website" className="md:col-span-2 lg:col-span-3">
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
