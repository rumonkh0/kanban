import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  MultiSelect,
} from "@/components/Component";
import Icon from "@/components/Icon";
import React, { useState } from "react";
import { Back } from "../../components/Component";

function ClientForm({ edit, client }) {
  const [showPassword, setShowPassword] = useState(false);
  const [methods, setMethods] = useState(client?.methods || []);
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    salutation: client?.salutation || "",
    category: client?.category || "",
    gender: client?.gender || "",
    name: client?.name || "",
    email: client?.email || "",
    country: client?.country || "",
    mobile: client?.mobile || "",
    dob: client?.dob || "",
    password: "",
    status: client?.status || "Active",
    loginAllowed: client?.loginAllowed || "Yes",
    notifications: client?.notifications || "Yes",
    companyName: client?.companyName || "",
    website: client?.website || "",
    taxName: client?.taxName || "",
    gstNumber: client?.gstNumber || "",
    officePhone: client?.officePhone || "",
    city: client?.city || "",
    state: client?.state || "",
    postalCode: client?.postalCode || "",
    address: client?.address || "",
    shippingAddress: client?.shippingAddress || "",
    note: client?.note || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "profile") setProfilePicture(reader.result); // base64 preview
      if (type === "logo") setCompanyLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const payload = { ...formData, methods, profilePicture, companyLogo };
    if (edit) payload.id = client.id;
    console.log(payload);
    // saveClientMutation.mutate(payload);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Account Details */}
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Account Details</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <FormField label="Salutation">
              <Dropdown
                options={["Mr.", "Mrs.", "Dr."]}
                value={formData.salutation}
                onChange={(val) => handleChange("salutation", val)}
              />
            </FormField>

            <FormField label="Client Name" required>
              <Input
                value={formData.name}
                onChange={(val) => handleChange("name", val)}
                placeholder="Enter Name"
              />
            </FormField>

            <FormField label="Profile Picture">
              <div className="flex items-center justify-center h-12 bg-surface2 border border-dashed border-divider rounded-lg relative">
                <label className="flex items-center gap-2 text-text2 cursor-pointer">
                  <Icon name="upload" size={16} />
                  <span className="typo-b3">Upload Profile Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "profile")}
                  />
                </label>
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile Preview"
                    className="absolute left-0 w-12 h-12 object-cover rounded-lg"
                  />
                )}
              </div>
            </FormField>

            <FormField label="Email" required>
              <Input
                value={formData.email}
                onChange={(val) => handleChange("email", val)}
                type="email"
                placeholder="Enter Email"
              />
            </FormField>

            <FormField label="Country">
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4  appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3"
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="flag" />
                </div>
                <Icon
                  name="arrow"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </FormField>

            <FormField label="Mobile">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-text2">
                  <Icon name="flag" />
                  <span className="text-text2 typo-b3">+1</span>
                  <Icon name="arrow" size={24} className="mr-1" />
                </div>
                <Input
                  value={formData.mobile}
                  onChange={(val) => handleChange("mobile", val)}
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="pl-23"
                />
              </div>
            </FormField>

            <FormField label="Gender">
              <Dropdown
                options={["Male", "Female", "Others"]}
                value={formData.gender}
                onChange={(val) => handleChange("gender", val)}
              />
            </FormField>

            <FormField label="Change Language">
              <div className="relative">
                <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon name="flag" />
                </div>
                <Icon
                  name="arrow"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </FormField>

            <FormField label="Client Category">
              <Dropdown
                options={["Design", "Development", "Marketing"]}
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </FormField>

            <FormField label="Date of Birth">
              <div className="relative">
                <Input
                  value={formData.dob}
                  onChange={(val) => handleChange("dob", val)}
                  type="date"
                  placeholder="Select Date"
                />
                <Icon
                  name="calendar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                />
              </div>
            </FormField>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="flex justify-between items-center w-full typo-b2 text-text2">
                <span>Password</span>
                <span className="text-[10px] text-text2">
                  Must have at least 8 characters
                </span>
              </label>
              <div className="relative w-full">
                <Input
                  value={formData.password}
                  onChange={(val) => handleChange("password", val)}
                  type={showPassword ? "text" : "password"}
                  placeholder={`Enter Password`}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            <FormField label="Account Status">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-success absolute left-4 top-1/2 -translate-y-1/2"></div>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <Icon
                  name="arrow"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </FormField>

            <FormField label="Login Allowed?">
              <div className="flex typo-cta">
                {["Yes", "No"].map((val, idx) => (
                  <label
                    key={val}
                    className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                      formData.loginAllowed === val
                        ? "bg-brand text-text"
                        : "bg-surface2 text-text2"
                    } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                  >
                    <Input
                      type="radio"
                      name="loginAllowed"
                      value={val}
                      checked={formData.loginAllowed === val}
                      onChange={() => handleChange("loginAllowed", val)}
                      className="hidden"
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </FormField>

            <FormField label="Receive email notifications?">
              <div className="flex typo-cta">
                {["Yes", "No"].map((val, idx) => (
                  <label
                    key={val}
                    className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                      formData.notifications === val
                        ? "bg-brand text-white"
                        : "bg-surface2 text-text"
                    } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                  >
                    <Input
                      type="radio"
                      name="notifications"
                      value={val}
                      checked={formData.notifications === val}
                      onChange={() => handleChange("notifications", val)}
                      className="hidden"
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </form>
        </div>
      </div>

      {/* Company Details */}
      <div>
        <div className="typo-b1 mb-4">Company Details</div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-6 gap-4">
            <FormField label="Company Name" className="col-span-2">
              <Input
                value={formData.companyName}
                onChange={(val) => handleChange("companyName", val)}
                type="text"
                placeholder="Enter Name"
              />
            </FormField>

            <FormField label="Official Website" className="col-span-2">
              <Input
                value={formData.website}
                onChange={(val) => handleChange("website", val)}
                type="url"
                placeholder="Enter Website"
              />
            </FormField>

            <FormField label="Tax Name" className="col-span-2">
              <Input
                value={formData.taxName}
                onChange={(val) => handleChange("taxName", val)}
                type="text"
                placeholder="e.g. GST/VAT"
              />
            </FormField>

            <FormField label="GST/VAT Number" className="col-span-2">
              <Input
                value={formData.gstNumber}
                onChange={(val) => handleChange("gstNumber", val)}
                type="text"
                placeholder="e.g. 412548NHS"
              />
            </FormField>

            <FormField label="Office Phone Number" className="col-span-2">
              <Input
                value={formData.officePhone}
                onChange={(val) => handleChange("officePhone", val)}
                type="tel"
                placeholder="e.g. 412548NHS"
              />
            </FormField>

            <FormField label="City" className="col-span-2">
              <Input
                value={formData.city}
                onChange={(val) => handleChange("city", val)}
                type="text"
                placeholder="e.g. New York"
              />
            </FormField>

            <FormField label="State" className="col-span-2">
              <Input
                value={formData.state}
                onChange={(val) => handleChange("state", val)}
                type="text"
                placeholder="e.g. New York"
              />
            </FormField>

            <FormField label="Postal code" className="col-span-2">
              <Input
                value={formData.postalCode}
                onChange={(val) => handleChange("postalCode", val)}
                type="text"
                placeholder="e.g. 502894"
              />
            </FormField>

            <FormField label="Company Address" className="col-span-3">
              <Input
                value={formData.address}
                onChange={(val) => handleChange("address", val)}
                type="text"
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                className="h-16"
              />
            </FormField>

            <FormField label="Shipping Address" className="col-span-3">
              <Input
                value={formData.shippingAddress}
                onChange={(val) => handleChange("shippingAddress", val)}
                type="text"
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                className="h-16"
              />
            </FormField>
          </form>
        </div>
      </div>

      <FormField label="Note">
        <textarea
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          placeholder="Enter Message"
          className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
        />
      </FormField>

      <MultiSelect
        label="Payment Method"
        options={["Zelle", "PayPal", "Bank Transfer", "Cash"]}
        value={methods}
        onChange={setMethods}
        className="h-16"
      />

      <FormField label="Company Logo">
        <div className="flex items-center justify-center h-16 bg-surface2 border border-dashed border-divider rounded-lg">
          <label className="flex items-center gap-2 text-text2 cursor-pointer">
            <Icon name="upload" size={24} />
            <span className="typo-b3">
              {companyLogo ? "Change Logo" : "Upload Company Logo"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "logo")}
            />
          </label>
          {companyLogo && (
            <img
              src={companyLogo}
              alt="Logo Preview"
              className="absolute left-0 rounded-lg w-16 h-16 object-cover"
            />
          )}
        </div>
      </FormField>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <RedButton type="button" onClick={handleSubmit}>
            Save
          </RedButton>
          {edit ? (
            <Back>
              <RedBorderButton>Cancel</RedBorderButton>
            </Back>
          ) : (
            <RedBorderButton>Save & Add More</RedBorderButton>
          )}
        </div>

        {edit ? (
          <RedButton>Delete Client</RedButton>
        ) : (
          <Back>
            <RedButton>Cancel</RedButton>
          </Back>
        )}
      </div>
    </div>
  );
}

export default ClientForm;
