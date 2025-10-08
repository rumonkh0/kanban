import { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  FormField,
  Icon,
  Input,
  MultiSelect,
  RedButton,
} from "../../components/Component";
import { useClient, useUpdateClient } from "../../hooks/useClients";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import {
  generateCountryOptions,
  generateLanguageOptions,
} from "../../components/Constants";
import { useAuthStore } from "../../stores/authStore";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function Setting() {
  const id = useAuthStore((state) => state.user.user.id);
  const [showPassword, setShowPassword] = useState(false);
  const [methods, setMethods] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const countryOptions = useMemo(() => generateCountryOptions(), []);
  const languageOptions = useMemo(() => generateLanguageOptions(), []);

  const togglePassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    salutation: undefined,
    category: "",
    gender: null,
    name: "",
    email: "",
    country: "",
    mobile: { countryCode: "", number: "" },
    dob: "",
    password: "",
    loginAllowed: true,
    notifications: true,
    companyName: "",
    website: "",
    taxName: "",
    gstNumber: "",
    officePhone: "",
    city: "",
    state: "",
    postalCode: "",
    address: "",
    shippingAddress: "",
    note: "",
  });

  const { data: clientData, isLoading: isLoadingClient } = useClient(id);
  const updateClientMutation = useUpdateClient(id);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "profile") {
      setProfilePictureFile(file);
    } else if (type === "logo") {
      setCompanyLogoFile(file);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "profile") setProfilePicture(reader.result);
      if (type === "logo") setCompanyLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        submitData.append(key, value);
      }
    });

    // Append additional data
    methods.forEach((method) => submitData.append("paymentMethods[]", method));
    // submitData.append("language", language);
    submitData.append("mobile[number]", formData.mobile.number);
    submitData.append("mobile[countryCode]", formData.mobile.countryCode);

    // Append files if selected
    if (profilePictureFile) {
      submitData.append("profilePicture", profilePictureFile);
    }
    if (companyLogoFile) {
      submitData.append("companyLogo", companyLogoFile);
    }
    // console.log(formData);
    // console.log(submitData);
    updateClientMutation.mutate(submitData);
  };

  useEffect(() => {
    if (clientData) {
      setFormData({
        salutation: clientData.salutation || "",
        category: clientData.category || "",
        gender: clientData.gender || "",
        name: clientData.name || "",
        email: clientData.email || "",
        country: clientData.country || "",
        mobile: clientData.mobile || "",
        dob: clientData.dob?.split("T")[0] || "",
        loginAllowed: clientData.loginAllowed,
        notifications: clientData.notifications,
        companyName: clientData.companyName || "",
        website: clientData.website || "",
        taxName: clientData.taxName || "",
        gstNumber: clientData.gstNumber || "",
        officePhone: clientData.officePhone || "",
        city: clientData.city || "",
        state: clientData.state || "",
        postalCode: clientData.postalCode || "",
        address: clientData.address || "",
        shippingAddress: clientData.shippingAddress || "",
        note: clientData.note || "",
        language: clientData.language || null,
      });

      setMethods(clientData.paymentMethods || []);
      // setLanguage(clientData.language || "English");
      setProfilePicture(
        (clientData.profilePicture?.filePath &&
          `${baseURL}/${clientData.profilePicture.filePath}`) ||
          null
      );
      setCompanyLogo(
        (clientData.companyLogo?.filePath &&
          `${baseURL}/${clientData.companyLogo.filePath}`) ||
          null
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData]);

  const isLoading = updateClientMutation?.isPending;

  if (isLoadingClient) {
    return <div>Loading client data...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div>
          <img
            src={profilePicture || "/images/profile.png"}
            alt=""
            className="w-40 h-43 rounded-sm object-cover"
          />
        </div>
        {/* <div className="flex-1 flex flex-wrap border border-divider rounded-lg bg-surface2 p-4">
          <div className="flex-[4] border-r-2 border-divider flex flex-col gap-2 pr-8">
            <div className="typo-b2">Emergency Contact</div>
            <Input placeholder="Enter Email" />
            <Input placeholder="Enter Phone" />
          </div>
          <div className="flex-[6] flex flex-col gap-2 pl-4">
            <div className="typo-b2">Documents</div>
            <div className="flex items-center justify-center h-12 bg-surface2 border-2 border-divider rounded-lg">
              <button
                type="button"
                className="flex items-center gap-2 text-text2"
              >
                <Icon name="upload" size={24} />
                <span className="typo-b3">Upload File Here</span>
              </button>
            </div>
            <div className="w-[184px] h-12 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
              <Icon name="file" size={35} />
              <div className="typo-b3 text-text flex flex-col">
                <h2>Project</h2>
                <p>Requirements.pdf</p>
              </div>
              <Icon name="cross-red" size={16} />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col gap-8">
        {/* Account Details */}
        <div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Dropdown
                  options={countryOptions} // Pass the structured options array
                  value={formData.country}
                  onChange={(newISO) => {
                    setFormData((prev) => ({ ...prev, country: newISO }));
                  }}
                />
              </FormField>

              <PhoneNumberInput formData={formData} setFormData={setFormData} />

              {/* <FormField label="Mobile">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-text2">
                      <Icon name="flag" />
                      <span className="text-text2 typo-b3">+1</span>
                      <Icon name="arrow" size={24} className="mr-1" />
                    </div>
                    <Input
                      value={formData.mobile.number}
                      onChange={(val) =>
                        setFormData((prev) => ({
                          ...prev,
                          mobile: {
                            ...prev.mobile,
                            number: val,
                          },
                        }))
                      }
                      type="tel"
                      placeholder="Enter Mobile Number"
                      className="pl-23"
                    />
                  </div>
                </FormField> */}

              <FormField label="Gender">
                <Dropdown
                  options={["Male", "Female", "Others"]}
                  value={formData.gender}
                  onChange={(val) => handleChange("gender", val)}
                />
              </FormField>

              <FormField label="Change Language">
                <Dropdown
                  options={languageOptions} // Pass the structured options array
                  value={formData.language} // The current ISO code
                  onChange={(lan) => {
                    handleChange("language", lan);
                  }} // Receives the new ISO code
                  placeholder="Choose Language"
                />
              </FormField>

              {/* <FormField label="Client Category">
                  <Dropdown
                    options={
                      Array.isArray(categories) && categories.length > 0
                        ? categories.map((cat) => cat.name)
                        : ["Design", "Development", "Marketing"]
                    }
                    value={formData.category}
                    onChange={(val) => handleChange("category", val)}
                  />
                </FormField> */}

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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Icon
                      name={showPassword ? "eye" : "eye"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* <FormField label="Account Status">
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 ${
                      formData.status === "Active" ? "bg-success" : "bg-brand"
                    }`}
                  ></div>
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
              </FormField> */}

              <FormField label="Login Allowed?">
                <div className="flex typo-cta">
                  {[true, false].map((val, idx) => (
                    <label
                      key={idx}
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
                      <span>{val ? "Yes" : "No"}</span>
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField label="Receive email notifications?">
                <div className="flex typo-cta">
                  {[true, false].map((val, idx) => (
                    <label
                      key={idx}
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
                      <span>{val ? "Yes" : "No"}</span>
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
            <form className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <FormField
                label="Company Name"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.companyName}
                  onChange={(val) => handleChange("companyName", val)}
                  type="text"
                  placeholder="Enter Name"
                />
              </FormField>

              <FormField
                label="Official Website"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.website}
                  onChange={(val) => handleChange("website", val)}
                  type="url"
                  placeholder="Enter Website"
                />
              </FormField>

              <FormField
                label="Tax Name"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.taxName}
                  onChange={(val) => handleChange("taxName", val)}
                  type="text"
                  placeholder="e.g. GST/VAT"
                />
              </FormField>

              <FormField
                label="GST/VAT Number"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.gstNumber}
                  onChange={(val) => handleChange("gstNumber", val)}
                  type="text"
                  placeholder="e.g. 412548NHS"
                />
              </FormField>

              <FormField
                label="Office Phone Number"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.officePhone}
                  onChange={(val) => handleChange("officePhone", val)}
                  type="tel"
                  placeholder="e.g. 412548NHS"
                />
              </FormField>

              <FormField label="City" className="md:col-span-3 lg:col-span-2">
                <Input
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  type="text"
                  placeholder="e.g. New York"
                />
              </FormField>

              <FormField label="State" className="md:col-span-3 lg:col-span-2">
                <Input
                  value={formData.state}
                  onChange={(val) => handleChange("state", val)}
                  type="text"
                  placeholder="e.g. New York"
                />
              </FormField>

              <FormField
                label="Postal code"
                className="md:col-span-3 lg:col-span-2"
              >
                <Input
                  value={formData.postalCode}
                  onChange={(val) => handleChange("postalCode", val)}
                  type="text"
                  placeholder="e.g. 502894"
                />
              </FormField>

              <FormField
                label="Company Address"
                className="md:col-span-6 lg:col-span-3"
              >
                <Input
                  value={formData.address}
                  onChange={(val) => handleChange("address", val)}
                  type="text"
                  placeholder="e.g. 132, My Street, Kingston, New York 12401"
                  className="h-16"
                />
              </FormField>

              <FormField
                label="Shipping Address"
                className="md:col-span-6 lg:col-span-3"
              >
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
          height="h-16"
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
            <RedButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Update
            </RedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
