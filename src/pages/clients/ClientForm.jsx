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

function ClientForm({ edit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [methods, setMethods] = useState([]);
  const togglePassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    salulation: "",
    category: "",
    gender: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="flex flex-col gap-8">
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
                value={formData.salulation}
                onChange={(val) => handleChange("salulation", val)}
              />
            </FormField>

            <FormField label="Client Name" required>
              <Input placeholder="Enter Name" />
            </FormField>
            <FormField label="Profile Picture">
              <div className="flex items-center justify-center h-12 bg-surface2 border border-dashed border-divider rounded-lg">
                <button
                  type="button"
                  className="flex items-center gap-2 text-text2"
                >
                  <Icon name="upload" size={16} />
                  <span className="typo-b3">Upload Profile Picture</span>
                </button>
              </div>
            </FormField>
            <FormField label="Email" required>
              <Input type="email" placeholder="Enter Email" />
            </FormField>
            <FormField label="Country">
              <div className="relative">
                <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4  appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3">
                  <option>USA</option>
                  <option>Canada</option>
                  <option>UK</option>
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
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="pl-23"
                />
              </div>
            </FormField>
            <FormField label="Gender">
              <Dropdown
                options={["Male", "female", "Others"]}
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
                <Input type="date" placeholder="Select Date" />
                <Icon
                  name="calendar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                />
              </div>
            </FormField>

            {/* Password */}
            <div className="flex flex-col gap-2">
              {/* Label */}
              <label className="flex justify-between items-center w-full typo-b2 text-text2">
                <span>Password</span>
                <span className="text-[10px] text-text2">
                  Must have at least 8 characters
                </span>
              </label>

              <div className="relative w-full">
                <Input
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
                <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8FC951]"></div> */}
                <Icon
                  name="arrow"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </FormField>
            <FormField label="Login Allowed?">
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <Input type="radio" name="login" className="hidden" />
                  <span>Yes</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <Input type="radio" name="login" className="hidden" />
                  <span>No</span>
                </label>
              </div>
            </FormField>
            <FormField label="Receive email notifications?">
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <Input type="radio" name="notifications" className="hidden" />
                  <span>Yes</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <Input type="radio" name="notifications" className="hidden" />
                  <span>No</span>
                </label>
              </div>
            </FormField>
          </form>
        </div>
      </div>
      <div>
        <div className="typo-b1 mb-4">Company Details</div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-6 gap-4">
            <FormField label="Company Name" className="col-span-2">
              <Input type="text" placeholder="Enter Name" />
            </FormField>
            <FormField label="Official Website" className="col-span-2">
              <Input type="url" placeholder="Enter Name" />
            </FormField>
            <FormField label="Tax Name" className="col-span-2">
              <Input type="text" placeholder="e.g. GST/VAT" />
            </FormField>
            <FormField label="GST/VAT Number" className="col-span-2">
              <Input type="text" placeholder="e.g. 412548NHS" />
            </FormField>
            <FormField label="Office Phone Number" className="col-span-2">
              <Input type="tel" placeholder="e.g. 412548NHS" />
            </FormField>
            <FormField label="City" className="col-span-2">
              <Input type="text" placeholder="e.g. New York" />
            </FormField>
            <FormField label="State" className="col-span-2">
              <Input type="text" placeholder="e.g. New York" />
            </FormField>
            <FormField label="Postal code" className="col-span-2">
              <Input type="text" placeholder="e.g. 502894" />
            </FormField>
            <FormField label="Added By" className="col-span-2">
              <div className="relative">
                <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 pl-12 appearance-none focus:outline-none focus:ring-2 focus:ring-brand typo-b3">
                  <option>Admin</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <img
                    src="/images/profile.png"
                    alt="Admin"
                    className="w-5 h-5 rounded-full"
                  />
                </div>
                <Icon
                  name="arrow"
                  size={24}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </FormField>
            <FormField label="Company Address" className="col-span-3">
              <Input
                type="text"
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                className="h-16"
              />
            </FormField>
            <FormField label="Shipping Address" className="col-span-3">
              <Input
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
          type="text"
          placeholder="Ener Message"
          className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
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
          <button type="button" className="flex items-center gap-2 text-text2">
            <Icon name="upload" size={24} />
            <span className="typo-b3">Upload Company Logo</span>
          </button>
        </div>
      </FormField>
      {edit ? (
        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton>Save</RedButton>
            <RedBorderButton>Cancel</RedBorderButton>
          </div>

          <RedButton>Delete Client</RedButton>
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
  );
}

export default ClientForm;
<div className="flex justify-between">
  <div className="flex gap-4">
    <RedButton>Save</RedButton>
    <RedBorderButton>Cancel</RedBorderButton>
  </div>

  <RedButton>Delete Client</RedButton>
</div>;
