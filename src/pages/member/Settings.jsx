import { useEffect, useState } from "react";
import {
  BinaryToggle,
  Dropdown,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";
import { useTeamMember, useUpdateTeamMember } from "../../hooks/useTeam";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function Setting() {
  const id = useAuthStore((state) => state.user.user._id);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emailNotifications: false,
    gender: "",
    dob: "",
    maritalStatus: "",
    address: "",
    about: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePictureFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const { data: teamMemberData, isLoading: isLoadingClient } =
    useTeamMember(id);
  const updateTeamMember = useUpdateTeamMember(id);

  const handleSubmit = (e) => {
    e.preventDefault();
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

    // submitData.append("language", language);
    // submitData.append("mobile[number]", formData.mobile.number);
    // submitData.append("mobile[countryCode]", formData.mobile.countryCode);

    // Append files if selected
    if (profilePictureFile) {
      submitData.append("profilePicture", profilePictureFile);
    }
    // console.log(formData);
    // console.log(submitData);
    toast.promise(
      updateTeamMember.mutateAsync(submitData),
      {
        pending: "Updating Data",
        success: "Profile Data Updated",
        error: {
          render({ data }) {
            const errorMessage =
              data.response?.data?.message ||
              data.response?.data?.error ||
              data.message ||
              "Failed to update Data.";
            return errorMessage;
          },
        },
      },
      { autoClose: 5000 }
    );
    updateTeamMember.mutate(submitData);
  };

  useEffect(() => {
    if (teamMemberData) {
      setFormData({
        name: teamMemberData.name || "",
        email: teamMemberData.user.email || "",
        gender: teamMemberData.gender || "",
        dob: teamMemberData.dob?.split("T")[0] || "",
        emailNotifications: teamMemberData.emailNotifications,
        address: teamMemberData.address || "",
        about: teamMemberData.about || "",
        maritalStatus: teamMemberData.maritalStatus || "",
      });

      setProfilePicture(
        (teamMemberData.profilePicture?.filePath &&
          `${baseURL}/${teamMemberData.profilePicture.filePath}`) ||
          null
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMemberData]);

  if (isLoadingClient) return <div>loading</div>;
  return (
    <div className="flex flex-col gap-4">
      {/* Profile & Docs Section */}
      <div className="flex gap-2">
        <div>
          <img
            src={profilePicture}
            alt=""
            className="w-40 h-43 rounded-sm object-cover"
          />
        </div>
        {/* <div className="flex-1 flex flex-wrap border border-divider rounded-lg bg-surface2 p-4">
          <div className="flex-[4] border-r-2 border-divider flex flex-col gap-2 pr-8">
            <div className="typo-b2">Emergency Contact</div>
            <Input
              placeholder="Enter Email"
              value={formData.emergencyEmail || ""}
              onChange={(e) => handleChange("emergencyEmail", e)}
            />
            <Input
              placeholder="Enter Phone"
              value={formData.emergencyPhone || ""}
              onChange={(e) => handleChange("emergencyPhone", e)}
            />
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

      {/* Form Section */}
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        <FormField label="Your Name">
          <Input
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e)}
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
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          </div>
        </FormField>
        <FormField label="Your Email" required>
          <Input
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e)}
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
              placeholder={`Enter Password`}
              value={formData.password}
              onChange={(e) => handleChange("password", e)}
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

        {/* Notifications */}
        <FormField label="Receive email notifications?">
          <BinaryToggle
            value={formData.emailNotifications}
            onChange={(val) => handleChange("emailNotifications", val)}
            name="emailNotifications"
            trueLabel="Yes"
            falseLabel="No"
          />
        </FormField>

        {/* Gender */}
        <FormField label="Gender">
          <Dropdown
            options={["Male", "Female", "Others"]}
            value={formData.gender}
            onChange={(val) => handleChange("gender", val)}
          />
        </FormField>

        {/* Date of Birth */}
        <FormField label="Date of Birth">
          <div className="relative">
            <Input
              type="date"
              placeholder="Select Date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e)}
            />
            <Icon
              name="calendar"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
            />
          </div>
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
        <FormField label="Address" className="col-span-3">
          <Input
            placeholder="Enter Address"
            className="h-16"
            value={formData.address}
            onChange={(e) => handleChange("address", e)}
          />
        </FormField>
        <FormField label="About" className="col-span-3">
          <textarea
            placeholder="About"
            className="h-40 p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm"
            value={formData.address2}
            onChange={(e) => handleChange("about", e.target.value)}
          ></textarea>
        </FormField>

        {/* Save Button */}
        <div className="col-span-3">
          <RedButton type="submit">save</RedButton>
        </div>
      </form>
    </div>
  );
}

export default Setting;
