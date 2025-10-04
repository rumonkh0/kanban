import { useState, useEffect } from "react";
import {
  BinaryToggle,
  Dropdown,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";

import { useAdminSetting, useEditAdminSetting } from "../../hooks/useSettings";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

// Helper function to safely extract the mobile number string for the form
// const getMobileString = (mobile) => {
//   if (mobile && mobile.number) {
//     // Assuming mobile is stored as { countryCode: "+1", number: "1234567890" }
//     return mobile.number.startsWith(mobile.countryCode)
//       ? mobile.number
//       : `${mobile.countryCode || ""}${mobile.number}`;
//   }
//   return "";
// };

// Helper function to parse the number string back into the object for the API
// const parseMobileObject = (mobileString) => {
//   // Simple parsing: assuming the full number includes the code, or you use a separate field for the code.
//   // For this example, we default to sending the entire string as the number and a default code.
//   if (!mobileString) return undefined;

//   // NOTE: In a real app, you'd use a separate country code input.
//   return {
//     countryCode: "+1", // Default or grab from another form field
//     number: mobileString,
//   };
// };

// ---------------- Component ----------------
function ProfileSetting({ role }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [profilePicture, setProfilePicture] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emailNotifications: true,
    googleCalendar: true,
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

  // State for the profile picture file
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  // NOTE: Renamed from documentFile to match the Admin schema field

  // ---------------- Handlers ----------------
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setProfilePictureFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ---------------- React Query ----------------
  // 2. USE CUSTOM GET HOOK
  const { data: profileData, isLoading: isLoadingProfile } = useAdminSetting();

  // Populate formData on success
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.user.email || "",
        password: "",
        emailNotifications: profileData.emailNotifications ? true : false,
        googleCalendar: profileData.googleCalendar ? true : false,
        country: profileData.country || "USA",
        mobile: profileData.mobile,
        language: profileData.language || "English",
        gender: profileData.gender || "",
        dateOfBirth: profileData.dateOfBirth
          ? profileData.dateOfBirth.substring(0, 10)
          : "",
        slackMemberId: profileData.slackMemberId || "",
        maritalStatus: profileData.maritalStatus || "",
        address: profileData.address || "",
        emergencyEmail: profileData.emergencyEmail || "",
        // Map emergency phone object to string
        emergencyPhone: profileData.emergencyPhone,
      });
      setProfilePicture(
        profileData?.profilePicture?.filePath
          ? `${baseURL}/${profileData.profilePicture.filePath}`
          : "/images/profile.png"
      );
    }
  }, [profileData]);

  // 3. USE CUSTOM EDIT HOOK
  const updateMutation = useEditAdminSetting();

  const isSaving = updateMutation.isPending;

  // ---------------- Submit Handler ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.warn("Please fill in Name and Email.");
      return;
    }

    // 4. PREPARE FORM DATA FOR MULTIPART/FORM-DATA
    const submitData = new FormData();

    // 5. APPEND PAYLOAD TO FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        submitData.append(key, value);
      }
    });

    // 6. APPEND FILE
    if (profilePictureFile) {
      submitData.append("profilePicture", profilePictureFile);
    }

    updateMutation.mutate(submitData, {
      onSuccess: () => {
        toast.success("Profile settings updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating profile settings:", error);
        // Assuming error.response.data?.message contains the Mongoose error
        toast.error(
          error.response?.data?.message ||
            "Failed to update profile settings. Please try again."
        );
      },
    });
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
            // Assuming your server provides a path for the profile picture
            src={profilePicture}
            alt="Profile"
            className="w-40 h-43 rounded-sm mx-auto lg:mx-0 object-cover"
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

            {/* Document Upload (Profile Picture) */}
            <div className="flex-1 lg:flex-[6] flex flex-col gap-2 pl-0 lg:pl-4">
              <div className="typo-b2">Profile Picture</div>
              <div className="flex items-center justify-center h-12 bg-surface2 border-2 border-divider rounded-lg">
                <label className="flex items-center gap-2 text-text2 cursor-pointer">
                  <Icon name="upload" size={24} />
                  <span className="typo-b3">
                    {profilePictureFile
                      ? profilePictureFile.name
                      : "Upload File Here"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    // IMPORTANT: Name must match the field used in the backend's upload middleware
                    name="profilePicture"
                    accept="image/*"
                  />
                </label>
              </div>
{/* 
              {(profilePictureFile || profileData?.profilePicture) && (
                <div className="w-full lg:w-[184px] h-12 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
                  <Icon name="file" size={35} />
                  <div className="typo-b3 text-text flex flex-col">
                    <h2>Current Image</h2>
                    <p>
                      {profilePictureFile
                        ? profilePictureFile.name
                        : "Existing File"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfilePictureFile(null)}
                  >
                    <Icon name="cross-red" size={16} />
                  </button>
                </div>
              )} */}
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
              placeholder="Enter New Password (Leave blank to keep old)"
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
          <BinaryToggle
            value={formData.emailNotifications}
            onChange={(val) => handleChange("emailNotifications", val)}
            name="isUrgent"
            trueLabel="Yes"
            falseLabel="No"
          />
        </FormField>

        {/* Google Calendar */}
        <FormField label="Enable Google Calendar">
          <BinaryToggle
            value={formData.googleCalendar}
            onChange={(val) => handleChange("googleCalendar", val)}
            name="isUrgent"
            trueLabel="Yes"
            falseLabel="No"
          />
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
            options={["Male", "Female", "Other"]} // Ensure options match schema
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
            // Ensure options match schema
            options={["Single", "Married", "Other"]}
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
