import { useState } from "react";
import {
  Dropdown,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// ---------------- API Functions ----------------
const profileAPI = {
  get: async () => {
    const response = await axios.get("/api/settings/profile");
    return response.data;
  },

  update: async (data) => {
    const response = await axios.put("/api/settings/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

// ---------------- Component ----------------
function ProfileSetting({ role }) {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emailNotifications: "Yes",
    googleCalendar: "Yes",
    country: "USA",
    mobile: "",
    language: "English",
    gender: "",
    dateOfBirth: "",
    slackMemberId: "",
    maritalStatus: "",
    address: "",
    emergencyEmail: "",
    emergencyPhone: "",
  });

  const [documentFile, setDocumentFile] = useState(null);

  // ---------------- Handlers ----------------
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setDocumentFile(file);
  };

  // ---------------- React Query ----------------
  // eslint-disable-next-line no-unused-vars
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profileSettings"],
    queryFn: profileAPI.get,
    onSuccess: (data) => {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        password: "",
        emailNotifications: data.emailNotifications || "Yes",
        googleCalendar: data.googleCalendar || "Yes",
        country: data.country || "USA",
        mobile: data.mobile || "",
        language: data.language || "English",
        gender: data.gender || "",
        dateOfBirth: data.dateOfBirth || "",
        slackMemberId: data.slackMemberId || "",
        maritalStatus: data.maritalStatus || "",
        address: data.address || "",
        emergencyEmail: data.emergencyEmail || "",
        emergencyPhone: data.emergencyPhone || "",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: profileAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileSettings"] });
      alert("Profile settings updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating profile settings:", error);
      alert("Failed to update profile settings. Please try again.");
    },
  });

  const isSaving = updateMutation.isPending;

  // ---------------- Submit Handler ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });
    if (documentFile) {
      submitData.append("document", documentFile);
    }

    console.log(submitData);
    updateMutation.mutate(submitData);
  };

  if (isLoadingProfile) {
    return <div>Loading profile settings...</div>;
  }

  // ---------------- Render ----------------
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Picture + Emergency Section */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
  {/* Profile Image */}
  <div className="flex-shrink-0">
    <img
      src="/images/profile.png"
      alt=""
      className="w-40 h-43 rounded-sm mx-auto lg:mx-0"
    />
  </div>

  {role === "admin" && (
    <div className="flex-1 flex flex-col lg:flex-row flex-wrap border border-divider rounded-lg bg-surface2 p-4 gap-4 lg:gap-0">
      
      {/* Emergency Contact */}
      <div className="flex-1 lg:flex-[4] border-r lg:border-r-2 border-divider flex flex-col gap-2 pr-0 lg:pr-8">
        <div className="typo-b2">Emergency Contact</div>
        <Input
          placeholder="Enter Email"
          value={formData.emergencyEmail}
          onChange={(val) => handleChange("emergencyEmail", val)}
        />
        <Input
          placeholder="Enter Phone"
          value={formData.emergencyPhone}
          onChange={(val) => handleChange("emergencyPhone", val)}
        />
      </div>

      {/* Document Upload */}
      <div className="flex-1 lg:flex-[6] flex flex-col gap-2 pl-0 lg:pl-4">
        <div className="typo-b2">Documents</div>
        <div className="flex items-center justify-center h-12 bg-surface2 border-2 border-divider rounded-lg">
          <label className="flex items-center gap-2 text-text2 cursor-pointer">
            <Icon name="upload" size={24} />
            <span className="typo-b3">
              {documentFile ? documentFile.name : "Upload File Here"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </label>
        </div>

        {documentFile && (
          <div className="w-full lg:w-[184px] h-12 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
            <Icon name="file" size={35} />
            <div className="typo-b3 text-text flex flex-col">
              <h2>Document</h2>
              <p>{documentFile.name}</p>
            </div>
            <button onClick={() => setDocumentFile(null)}>
              <Icon name="cross-red" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>


      {/* Profile Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        <FormField label="Your Name">
          <Input
            placeholder="Enter Name"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
        </FormField>

        <FormField label="Your Email" required>
          <Input
            placeholder="Enter Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(val) => handleChange("password", val)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? "eye" : "eye"} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Notifications */}
        <FormField label="Receive email notifications?">
          <div className="flex typo-cta">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-lg ${
                  formData.emailNotifications === option
                    ? "bg-brand text-white"
                    : "bg-surface2 text-text"
                }`}
              >
                <Input
                  type="radio"
                  name="notifications"
                  className="hidden"
                  checked={formData.emailNotifications === option}
                  onChange={() => handleChange("emailNotifications", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        {/* Google Calendar */}
        <FormField label="Enable Google Calendar">
          <div className="flex typo-cta">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-lg ${
                  formData.googleCalendar === option
                    ? "bg-brand text-white"
                    : "bg-surface2 text-text"
                }`}
              >
                <Input
                  type="radio"
                  name="googleCalendar"
                  className="hidden"
                  checked={formData.googleCalendar === option}
                  onChange={() => handleChange("googleCalendar", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </FormField>

        {/* Country */}
        <FormField label="Country">
          <select
            className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none typo-b3"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          >
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
        </FormField>

        {/* Mobile */}
        <FormField label="Mobile">
          <Input
            type="tel"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={(val) => handleChange("mobile", val)}
          />
        </FormField>

        {/* Language */}
        <FormField label="Change Language">
          <select
            className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none typo-b3"
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </FormField>

        {/* Gender */}
        <FormField label="Gender">
          <Dropdown
            options={["Male", "Female", "Others"]}
            value={formData.gender}
            onChange={(val) => handleChange("gender", val)}
          />
        </FormField>

        {/* DOB */}
        <FormField label="Date of Birth">
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(val) => handleChange("dateOfBirth", val)}
          />
        </FormField>

        {/* Slack ID */}
        <FormField label="Slack Member ID">
          <Input
            placeholder="eg.@admin"
            value={formData.slackMemberId}
            onChange={(val) => handleChange("slackMemberId", val)}
          />
        </FormField>

        {/* Marital Status */}
        <FormField label="Marital Status">
          <Dropdown
            options={[
              "Single",
              "Married",
              "Unmarried",
              "Divorced",
              "Widowed",
              "Separated",
              "In a relationship",
              "It's complicated",
              "Prefer not to say",
            ]}
            value={formData.maritalStatus}
            onChange={(val) => handleChange("maritalStatus", val)}
          />
        </FormField>

        {/* Address */}
        <FormField label="Address" className="md:col-span-2 lg:col-span-3">
          <Input
            placeholder="Enter Address"
            className="h-16"
            value={formData.address}
            onChange={(val) => handleChange("address", val)}
          />
        </FormField>
      </form>

      {/* Save Button */}
      <div>
        <RedButton type="button" onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </RedButton>
      </div>
    </div>
  );
}

export default ProfileSetting;
