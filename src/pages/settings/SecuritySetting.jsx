import React, { useState, useEffect } from "react";
import { FormField, Input, RedButton } from "../../components/Component";

import {
  useSecuritySetting,
  useEditSecuritySetting,
} from "../../hooks/useSettings";
import { toast } from "react-toastify";

function SecuritySetting() {
  const [formData, setFormData] = useState({
    emailAuthEnabled: false,
    smsAuthEnabled: false,
    googleRecaptchaEnabled: false,
    recaptchaVersion: "",
    recaptchaV2Key: "",
    recaptchaV2Secret: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { data: securityData, isLoading: isLoadingSecurity } =
    useSecuritySetting();

  useEffect(() => {
    if (securityData) {
      setFormData({
        emailAuthEnabled: securityData.emailAuthEnabled || false,
        smsAuthEnabled: securityData.smsAuthEnabled || false,
        googleRecaptchaEnabled: securityData.googleRecaptchaEnabled || false,
        recaptchaVersion: securityData.recaptchaVersion || "v2",
        recaptchaV2Key: securityData.recaptchaV2Key || "",
        recaptchaV2Secret: securityData.recaptchaV2Secret || "",
      });
    }
  }, [securityData]);

  const updateMutation = useEditSecuritySetting();
  const isLoading = updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      formData.googleRecaptchaEnabled &&
      (!formData.recaptchaV2Key || !formData.recaptchaV2Secret)
    ) {
      toast.warn("Please fill in the Google Recaptcha keys.");
      return;
    }

    // Call the mutation hook's mutate function
    updateMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Security settings updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating security settings:", error);
        toast.error("Failed to update security settings. Please try again.");
      },
    });
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
      {/* <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
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
      </div> */}
      <div className="border border-divider"></div>
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="googleRecaptcha"
            checked={formData.recaptchaVersion !== "none"}
            onChange={(e) =>
              handleChange(
                "recaptchaVersion",
                e.target.checked ? formData.recaptchaVersion : "none"
              )
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
                formData.recaptchaVersion === "v2"
                  ? "bg-brand text-white"
                  : "bg-surface2 text-text"
              }`}
            >
              <input
                type="radio"
                name="recaptchaVersion"
                value="v2"
                checked={formData.recaptchaVersion === "v2"}
                onChange={() => handleChange("recaptchaVersion", "v2")}
                className="hidden"
              />
              <span>v2</span>
            </label>
            <label
              className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-r-lg ${
                formData.recaptchaVersion === "v3"
                  ? "bg-brand text-white"
                  : "bg-surface2 text-text"
              }`}
            >
              <input
                type="radio"
                name="recaptchaVersion"
                value="v3"
                checked={formData.recaptchaVersion === "v3"}
                onChange={() => handleChange("recaptchaVersion", "v3")}
                className="hidden"
              />
              <span>v3</span>
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
