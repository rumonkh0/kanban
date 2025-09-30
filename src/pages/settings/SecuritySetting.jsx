import React, { useState } from "react";
import { FormField, Input, RedButton } from "../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API Functions
const securityAPI = {
  // Get security settings
  get: async () => {
    const response = await axios.get("/api/settings/security");
    return response.data;
  },

  // Update security settings
  update: async (data) => {
    const response = await axios.put("/api/settings/security", data);
    return response.data;
  },
};

function SecuritySetting() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    emailAuthEnabled: false,
    smsAuthEnabled: false,
    googleRecaptchaEnabled: false,
    recaptchaVersion: "V2",
    recaptchaV2Key: "",
    recaptchaV2Secret: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch security settings
  // eslint-disable-next-line no-unused-vars
  const { data: securityData, isLoading: isLoadingSecurity } = useQuery({
    queryKey: ["securitySettings"],
    queryFn: securityAPI.get,
    onSuccess: (data) => {
      setFormData({
        emailAuthEnabled: data.emailAuthEnabled || false,
        smsAuthEnabled: data.smsAuthEnabled || false,
        googleRecaptchaEnabled: data.googleRecaptchaEnabled || false,
        recaptchaVersion: data.recaptchaVersion || "V2",
        recaptchaV2Key: data.recaptchaV2Key || "",
        recaptchaV2Secret: data.recaptchaV2Secret || "",
      });
    },
  });

  // Update security settings mutation
  const updateMutation = useMutation({
    mutationFn: securityAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securitySettings"] });
      alert("Security settings updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating security settings:", error);
      alert("Failed to update security settings. Please try again.");
    },
  });

  const isLoading = updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      formData.googleRecaptchaEnabled &&
      (!formData.recaptchaV2Key || !formData.recaptchaV2Secret)
    ) {
      alert("Please fill in the Google Recaptcha keys.");
      return;
    }
    console.log(formData);
    updateMutation.mutate(formData);
  };

  const handleEnableEmail = () => {
    handleChange("emailAuthEnabled", !formData.emailAuthEnabled);
  };

  const handleEnableSMS = () => {
    handleChange("smsAuthEnabled", !formData.smsAuthEnabled);
  };

  if (isLoadingSecurity) {
    return <div>Loading security settings...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <div className="p-4 bg-surface2 border border-divider rounded-lg flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img src="/images/gmail.png" alt="" className="h-20 w-20" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="typo-h4">Setup Using Email</div>
              <div className="typo-b2 text-text2">
                Enabling this feature will send code on your email account
                admin@gmail.com for log in.
              </div>
            </div>
          </div>
          <div>
            <RedButton type="button" onClick={handleEnableEmail}>
              {formData.emailAuthEnabled ? "Disable" : "Enable"}
            </RedButton>
          </div>
        </div>
        <div className="p-4 bg-surface2 border border-divider rounded-lg flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img src="/images/gmail.png" alt="" className="h-20 w-20" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="typo-h4">Setup Using SMS</div>
              <div className="typo-b2 text-text2">
                Enabling this feature will send code on your phone number for
                log in.
              </div>
            </div>
          </div>
          <div>
            <RedButton type="button" onClick={handleEnableSMS}>
              {formData.smsAuthEnabled ? "Disable" : "Enable"}
            </RedButton>
          </div>
        </div>
        <div></div>
      </div>
      <div className="border border-divider"></div>
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="googleRecaptcha"
            checked={formData.googleRecaptchaEnabled}
            onChange={(e) =>
              handleChange("googleRecaptchaEnabled", e.target.checked)
            }
            className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
          />
          <label htmlFor="googleRecaptcha" className="typo-b3 text-text">
            Google Recaptcha
          </label>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField label="Choose Google Recaptcha Version">
          <div className="flex typo-cta">
            <label
              className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-l-lg ${
                formData.recaptchaVersion === "V2"
                  ? "bg-brand text-white"
                  : "bg-surface2 text-text"
              }`}
            >
              <input
                type="radio"
                name="recaptchaVersion"
                value="V2"
                checked={formData.recaptchaVersion === "V2"}
                onChange={() => handleChange("recaptchaVersion", "V2")}
                className="hidden"
              />
              <span>V2</span>
            </label>
            <label
              className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-r-lg ${
                formData.recaptchaVersion === "V3"
                  ? "bg-brand text-white"
                  : "bg-surface2 text-text"
              }`}
            >
              <input
                type="radio"
                name="recaptchaVersion"
                value="V3"
                checked={formData.recaptchaVersion === "V3"}
                onChange={() => handleChange("recaptchaVersion", "V3")}
                className="hidden"
              />
              <span>V3</span>
            </label>
          </div>
        </FormField>
        <FormField label="Google Recaptcha V2 Key" required>
          <Input
            placeholder="Type key"
            value={formData.recaptchaV2Key}
            onChange={(val) => handleChange("recaptchaV2Key", val)}
          />
        </FormField>
        <FormField label="Google Recaptcha V2 Secret" required>
          <Input
            placeholder="Type key"
            value={formData.recaptchaV2Secret}
            onChange={(val) => handleChange("recaptchaV2Secret", val)}
          />
        </FormField>
      </form>
      <div>
        <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </RedButton>
      </div>
    </div>
  );
}

export default SecuritySetting;
