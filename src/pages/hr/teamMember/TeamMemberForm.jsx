import ClientSelect from "@/components/ClientSelect";
import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  Back,
  InputMoney,
} from "@/components/Component";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

// API Functions
const teamMemberAPI = {
  // Get all team members
  getAll: async () => {
    const response = await axios.get("/api/team-members");
    return response.data;
  },

  // Get single team member
  getById: async (id) => {
    const response = await axios.get(`/api/team-members/${id}`);
    return response.data;
  },

  // Create new team member
  create: async (data) => {
    const response = await axios.post("/api/team-members", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update team member
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/team-members/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete team member
  delete: async (id) => {
    const response = await axios.delete(`/api/team-members/${id}`);
    return response.data;
  },
};

// Get departments for dropdown
const getDepartments = async () => {
  const response = await axios.get("/api/departments");
  return response.data;
};

// Get roles for dropdown
const getRoles = async () => {

  // const response = await axios.get("/api/roles");
  // return response.data;
};

function TeamMemberForm({ edit, title = "Add Team Member" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    memberId: "",
    salutation: "",
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    country: "USA",
    mobile: "",
    gender: "",
    joiningDate: "",
    dateOfBirth: "",
    language: "English",
    role: "",
    address: "",
    about: "",
    loginAllowed: "Yes",
    emailNotifications: "Yes",
    averageRate: "",
    slackId: "",
    skills: "",
    probationEndDate: "",
    noticePeriodStartDate: "",
    noticePeriodEndDate: "",
    employmentType: "",
    addedBy: "",
    maritalStatus: "",
    businessAddress: "",
    accountStatus: "Active",
  });

  // Fetch team member data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: teamMember, isLoading: isLoadingTeamMember } = useQuery({
    queryKey: ["teamMember", id],
    queryFn: () => teamMemberAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        memberId: data.memberId || "",
        salutation: data.salutation || "",
        name: data.name || "",
        email: data.email || "",
        password: "", // Don't populate password for security
        designation: data.designation || "",
        department: data.department || "",
        country: data.country || "USA",
        mobile: data.mobile || "",
        gender: data.gender || "",
        joiningDate: data.joiningDate || "",
        dateOfBirth: data.dateOfBirth || "",
        language: data.language || "English",
        role: data.role || "",
        address: data.address || "",
        about: data.about || "",
        loginAllowed: data.loginAllowed || "Yes",
        emailNotifications: data.emailNotifications || "Yes",
        averageRate: data.averageRate || "",
        slackId: data.slackId || "",
        skills: data.skills || "",
        probationEndDate: data.probationEndDate || "",
        noticePeriodStartDate: data.noticePeriodStartDate || "",
        noticePeriodEndDate: data.noticePeriodEndDate || "",
        employmentType: data.employmentType || "",
        addedBy: data.addedBy || "",
        maritalStatus: data.maritalStatus || "",
        businessAddress: data.businessAddress || "",
        accountStatus: data.accountStatus || "Active",
      });
      if (data.profilePicture) {
        setProfilePreview(data.profilePicture);
      }
    },
  });

  // Fetch departments
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  // Fetch roles
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  // Create team member mutation
  const createMutation = useMutation({
    mutationFn: teamMemberAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      navigate("/hr/team-members");
    },
    onError: (error) => {
      console.error("Error creating team member:", error);
      alert("Failed to create team member. Please try again.");
    },
  });

  // Update team member mutation
  const updateMutation = useMutation({
    mutationFn: teamMemberAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      queryClient.invalidateQueries({ queryKey: ["teamMember", id] });
      navigate("/hr/team-members");
    },
    onError: (error) => {
      console.error("Error updating team member:", error);
      alert("Failed to update team member. Please try again.");
    },
  });

  // Delete team member mutation
  const deleteMutation = useMutation({
    mutationFn: teamMemberAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      navigate("/hr/team-members");
    },
    onError: (error) => {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member. Please try again.");
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); // For debugging

    // Basic validation
    if (!formData.name || !formData.email || !formData.joiningDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Append profile picture if selected
    if (profilePicture) {
      submitData.append("profilePicture", profilePicture);
    }

    if (edit) {
      updateMutation.mutate({ id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.joiningDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    if (profilePicture) {
      submitData.append("profilePicture", profilePicture);
    }

    createMutation.mutate(submitData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          memberId: "",
          salutation: "",
          name: "",
          email: "",
          password: "",
          designation: "",
          department: "",
          country: "USA",
          mobile: "",
          gender: "",
          joiningDate: "",
          dateOfBirth: "",
          language: "English",
          role: "",
          address: "",
          about: "",
          loginAllowed: "Yes",
          emailNotifications: "Yes",
          averageRate: "",
          slackId: "",
          skills: "",
          probationEndDate: "",
          noticePeriodStartDate: "",
          noticePeriodEndDate: "",
          employmentType: "",
          addedBy: "",
          maritalStatus: "",
          businessAddress: "",
          accountStatus: "Active",
        });
        setProfilePicture(null);
        setProfilePreview(null);
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteMutation.mutate(id);
    }
  };

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (edit && isLoadingTeamMember) {
    return <div>Loading team member data...</div>;
  }
  return (
    <>
      <PageTitle title={title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">Team Member Details</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
              <FormField label="Members ID">
                <Input
                  value={formData.memberId}
                  onChange={(val) => handleChange("memberId", val)}
                  placeholder="EMP-12 ( Auto )"
                />
              </FormField>
              <FormField label="Salutation">
                <Dropdown
                  options={["Mr.", "Mrs.", "Dr."]}
                  value={formData.salutation}
                  onChange={(val) => handleChange("salutation", val)}
                />
              </FormField>
              <FormField label="Members Name" required>
                <Input
                  value={formData.name}
                  onChange={(val) => handleChange("name", val)}
                  placeholder="Enter Name"
                />
              </FormField>
              <FormField label="Email" required>
                <Input
                  value={formData.email}
                  onChange={(val) => handleChange("email", val)}
                  type="email"
                  placeholder="Enter Email"
                />
              </FormField>
              {/* Password */}
              <div className="flex flex-col gap-2">
                {/* Label */}
                <label className="flex justify-between items-center w-full typo-b2 text-text2">
                  <span>
                    Password {!edit && <span className="text-brand">*</span>}
                  </span>
                  <span className="text-[10px] text-text2">
                    Must have at least 8 characters
                  </span>
                </label>

                <div className="relative w-full">
                  <Input
                    value={formData.password}
                    onChange={(val) => handleChange("password", val)}
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      edit
                        ? "Leave blank to keep current password"
                        : "Enter Password"
                    }
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
              <FormField label="Profile Picture">
                <div className="flex items-center justify-center h-12 bg-surface2 border border-dashed border-divider rounded-lg relative">
                  <label className="flex items-center gap-2 text-text2 cursor-pointer">
                    <Icon name="upload" size={16} />
                    <span className="typo-b3">
                      {profilePreview
                        ? "Change Picture"
                        : "Upload Profile Picture"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="absolute left-0 w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                </div>
              </FormField>
              <FormField label="Designation" required>
                <Dropdown
                  options={["Team Member", "Admin", "Client"]}
                  value={formData.designation}
                  onChange={(val) => handleChange("designation", val)}
                />
              </FormField>
              <FormField label="Department" required>
                <Dropdown
                  options={
                    Array.isArray(departments) && departments.length > 0
                      ? departments.map((department) => department.name)
                      : ["Design", "Developer", "QA"]
                  }
                  value={formData.department}
                  onChange={(val) => handleChange("department", val)}
                />
              </FormField>
              <FormField label="Country">
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4  appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3"
                  >
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
              <FormField label="Joining Date " required>
                <div className="relative">
                  <Input
                    value={formData.joiningDate}
                    onChange={(val) => handleChange("joiningDate", val)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Date of Birth">
                <div className="relative">
                  <Input
                    value={formData.dateOfBirth}
                    onChange={(val) => handleChange("dateOfBirth", val)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>

              <FormField label="Change Language">
                <div className="relative">
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
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
              <FormField label="User Role">
                <Dropdown
                  options={
                    Array.isArray(roles) && roles.length > 0
                      ? roles.map((role) => role.name)
                      : ["Team Member", "Admin", "Client"]
                  }
                  value={formData.role}
                  onChange={(val) => handleChange("role", val)}
                />
              </FormField>
              <FormField label="Address" className="col-span-3">
                <Input
                  value={formData.address}
                  onChange={(val) => handleChange("address", val)}
                  type="text"
                  placeholder="e.g. 132, My Street, Kingston, New York 12401"
                  className="h-16"
                />
              </FormField>
              <FormField label="About" className="col-span-3">
                <textarea
                  value={formData.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  placeholder="Enter Message"
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
            </form>
          </div>
        </div>
        <div>
          <div className="typo-b1 mb-4">Other Details</div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-3 gap-4">
              <FormField label="Login Allowed?">
                <div className="flex typo-cta">
                  {["Yes", "No"].map((val, idx) => (
                    <label
                      key={val}
                      className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                        formData.loginAllowed === val
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text"
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
                        formData.emailNotifications === val
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text"
                      } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                    >
                      <Input
                        type="radio"
                        name="emailNotifications"
                        value={val}
                        checked={formData.emailNotifications === val}
                        onChange={() => handleChange("emailNotifications", val)}
                        className="hidden"
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              <FormField label="Average Rate" required>
                <InputMoney
                  value={formData.averageRate}
                  onChange={(val) => handleChange("averageRate", val)}
                  placeholder="USD"
                />
              </FormField>
              <FormField label="Slack Member ID">
                <Input
                  value={formData.slackId}
                  onChange={(val) => handleChange("slackId", val)}
                  type="text"
                  placeholder="e.g:@hdgeb"
                />
              </FormField>
              <FormField label="Skills">
                <Input
                  value={formData.skills}
                  onChange={(val) => handleChange("skills", val)}
                  type="text"
                  placeholder="e.g: UI, JAVA"
                />
              </FormField>
              <FormField label="Probation End Date" required>
                <div className="relative">
                  <Input
                    value={formData.probationEndDate}
                    onChange={(val) => handleChange("probationEndDate", val)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Notice Period Start Date" required>
                <div className="relative">
                  <Input
                    value={formData.noticePeriodStartDate}
                    onChange={(val) =>
                      handleChange("noticePeriodStartDate", val)
                    }
                    type="date"
                    placeholder="Select Date"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Notice Period End Date" required>
                <div className="relative">
                  <Input
                    value={formData.noticePeriodEndDate}
                    onChange={(val) => handleChange("noticePeriodEndDate", val)}
                    type="date"
                    placeholder="Select Date"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Employment Type">
                <Dropdown
                  options={["Part Time", "Full Time", "Contractual"]}
                  value={formData.employmentType}
                  onChange={(val) => handleChange("employmentType", val)}
                />
              </FormField>
              <ClientSelect
                onSelect={(client) => handleChange("addedBy", client.id)}
                label="Added By"
              />
              <FormField label="Marital Status">
                <Dropdown
                  options={["Single", "Married", "Divorced", "Widowed"]}
                  value={formData.maritalStatus}
                  onChange={(val) => handleChange("maritalStatus", val)}
                />
              </FormField>
              <FormField label="Business Address" required>
                <Dropdown
                  options={["Main Office", "Branch Office", "Remote"]}
                  value={formData.businessAddress}
                  onChange={(val) => handleChange("businessAddress", val)}
                />
              </FormField>
              <FormField label="Account Status">
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 ${
                      formData.accountStatus === "Active"
                        ? "bg-success"
                        : formData.accountStatus === "Inactive"
                        ? "bg-gray-400"
                        : "bg-brand"
                    }`}
                  ></div>
                  <select
                    value={formData.accountStatus}
                    onChange={(e) =>
                      handleChange("accountStatus", e.target.value)
                    }
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <Icon
                    name="arrow"
                    size={24}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
            </form>
          </div>
        </div>

        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            </div>

            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <RedBorderButton
                type="button"
                onClick={handleSaveAndAddMore}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            </div>

            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamMemberForm;
