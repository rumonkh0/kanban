import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  MultiSelect,
} from "@/components/Component";
import Icon from "@/components/Icon";
import { useState } from "react";
import { Back } from "../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageTitle from "@/components/PageTitle";

// API Functions
const clientAPI = {
  // Get all clients
  getAll: async () => {
    const response = await axios.get("/api/clients");
    return response.data;
  },

  // Get single client
  getById: async (id) => {
    const response = await axios.get(`/api/clients/${id}`);
    return response.data;
  },

  // Create new client
  create: async (data) => {
    const response = await axios.post("/api/clients", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update client
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/clients/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete client
  delete: async (id) => {
    const response = await axios.delete(`/api/clients/${id}`);
    return response.data;
  },
};

// Get client categories for dropdown
const getClientCategories = async () => {
  const response = await axios.get("/api/client-categories");
  return response.data;
};

function ClientForm({ edit, title = "Add Client" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const [methods, setMethods] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [language, setLanguage] = useState("English");

  const togglePassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    salutation: "",
    category: "",
    gender: "",
    name: "",
    email: "",
    country: "",
    mobile: "",
    dob: "",
    password: "",
    status: "Active",
    loginAllowed: "Yes",
    notifications: "Yes",
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

  // Fetch client data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: clientData, isLoading: isLoadingClient } = useQuery({
    queryKey: ["client", id],
    queryFn: () => clientAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        salutation: data.salutation || "",
        category: data.category || "",
        gender: data.gender || "",
        name: data.name || "",
        email: data.email || "",
        country: data.country || "",
        mobile: data.mobile || "",
        dob: data.dob || "",
        password: "", // Don't populate password for security
        status: data.status || "Active",
        loginAllowed: data.loginAllowed || "Yes",
        notifications: data.notifications || "Yes",
        companyName: data.companyName || "",
        website: data.website || "",
        taxName: data.taxName || "",
        gstNumber: data.gstNumber || "",
        officePhone: data.officePhone || "",
        city: data.city || "",
        state: data.state || "",
        postalCode: data.postalCode || "",
        address: data.address || "",
        shippingAddress: data.shippingAddress || "",
        note: data.note || "",
      });
      setMethods(data.methods || []);
      setLanguage(data.language || "English");
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }
      if (data.companyLogo) {
        setCompanyLogo(data.companyLogo);
      }
    },
  });

  // Fetch client categories
  const { data: categories = [] } = useQuery({
    queryKey: ["clientCategories"],
    queryFn: getClientCategories,
  });

  // Create client mutation
  const createMutation = useMutation({
    mutationFn: clientAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate("/clients");
    },
    onError: (error) => {
      console.error("Error creating client:", error);
      alert("Failed to create client. Please try again.");
    },
  });

  // Update client mutation
  const updateMutation = useMutation({
    mutationFn: clientAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      navigate("/clients");
    },
    onError: (error) => {
      console.error("Error updating client:", error);
      alert("Failed to update client. Please try again.");
    },
  });

  // Delete client mutation
  const deleteMutation = useMutation({
    mutationFn: clientAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate("/clients");
    },
    onError: (error) => {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    },
  });

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
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Append additional data
    submitData.append("methods", JSON.stringify(methods));
    submitData.append("language", language);

    // Append files if selected
    if (profilePictureFile) {
      submitData.append("profilePicture", profilePictureFile);
    }
    if (companyLogoFile) {
      submitData.append("companyLogo", companyLogoFile);
    }

    if (edit) {
      updateMutation.mutate({ id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    submitData.append("methods", JSON.stringify(methods));
    submitData.append("language", language);

    if (profilePictureFile) {
      submitData.append("profilePicture", profilePictureFile);
    }
    if (companyLogoFile) {
      submitData.append("companyLogo", companyLogoFile);
    }

    createMutation.mutate(submitData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          salutation: "",
          category: "",
          gender: "",
          name: "",
          email: "",
          country: "",
          mobile: "",
          dob: "",
          password: "",
          status: "Active",
          loginAllowed: "Yes",
          notifications: "Yes",
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
        setMethods([]);
        setLanguage("English");
        setProfilePicture(null);
        setCompanyLogo(null);
        setProfilePictureFile(null);
        setCompanyLogoFile(null);
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteMutation.mutate(id);
    }
  };

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (edit && isLoadingClient) {
    return <div>Loading client data...</div>;
  }

  return (
    <>
      <PageTitle title={edit ? "Edit Client" : title} />
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
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
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

              <FormField label="Client Category">
                <Dropdown
                  options={
                    Array.isArray(categories) && categories.length > 0
                      ? categories.map((cat) => cat.name)
                      : ["Design", "Development", "Marketing"]
                  }
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
            <RedButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </RedButton>
            {edit ? (
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            ) : (
              <RedBorderButton
                type="button"
                onClick={handleSaveAndAddMore}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Client"}
            </RedButton>
          ) : (
            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientForm;
