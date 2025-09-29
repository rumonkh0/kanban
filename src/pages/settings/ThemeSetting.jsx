import {
  FormField,
  Input,
  RedBorderButton,
  RedButton,
} from "../../components/Component";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API Functions
const themeAPI = {
  get: async () => {
    const response = await axios.get("/api/settings/theme");
    return response.data;
  },
  update: async (data) => {
    const response = await axios.put("/api/settings/theme", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  resetDefault: async () => {
    const response = await axios.post("/api/settings/theme/reset");
    return response.data;
  },
};

function ThemeSetting() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    appName: "",
    brandingStyle: "style1",
    lightModeLogo: null,
    darkModeLogo: null,
    loginBackgroundImage: null,
    faviconImage: null,
    loginLogoBgColor: "",
    loginLogoTxtColor: "Dark",
    defaultTheme: "Dark",
    publicPrimaryColor: "#000000",
    publicTheme: "Dark",
    adminPrimaryColor: "#000000",
    adminTheme: "Dark",
    employeePrimaryColor: "#000000",
    employeeTheme: "Dark",
    clientPrimaryColor: "#000000",
    clientTheme: "Dark",
  });

  const [logoFiles, setLogoFiles] = useState({
    lightModeLogo: null,
    darkModeLogo: null,
    loginBackgroundImage: null,
    faviconImage: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoFiles((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: previewUrl,
      }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { data: themeData, isLoading: isLoadingTheme } = useQuery({
    queryKey: ["themeSettings"],
    queryFn: themeAPI.get,
    onSuccess: (data) => {
      setFormData({
        appName: data.appName || "",
        brandingStyle: data.brandingStyle || "style1",
        lightModeLogo: null,
        darkModeLogo: null,
        loginBackgroundImage: null,
        faviconImage: null,
        loginLogoBgColor: data.loginLogoBgColor || "",
        defaultTheme: data.defaultTheme || "Dark",
        publicPrimaryColor: data.publicPrimaryColor || "#000000",
        publicTheme: data.publicTheme || "Dark",
        adminPrimaryColor: data.adminPrimaryColor || "#000000",
        adminTheme: data.adminTheme || "Dark",
        employeePrimaryColor: data.employeePrimaryColor || "#000000",
        employeeTheme: data.employeeTheme || "Dark",
        clientPrimaryColor: data.clientPrimaryColor || "#000000",
        clientTheme: data.clientTheme || "Dark",
      });

      setLogoFiles((prev) => ({
        ...prev,
        lightModeLogoPreview: data.lightModeLogo || null,
        darkModeLogoPreview: data.darkModeLogo || null,
        loginBackgroundImagePreview: data.loginBackgroundImage || null,
        faviconImagePreview: data.faviconImage || null,
      }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: themeAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themeSettings"] });
      alert("Theme settings updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating theme settings:", error);
      alert("Failed to update theme settings. Please try again.");
    },
  });

  const resetMutation = useMutation({
    mutationFn: themeAPI.resetDefault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themeSettings"] });
      alert("Theme reset to default successfully!");
    },
    onError: (error) => {
      console.error("Error resetting theme:", error);
      alert("Failed to reset theme. Please try again.");
    },
  });

  const isLoading = updateMutation.isPending || resetMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.appName) {
      alert("Please fill in the app name.");
      return;
    }

    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && !(formData[key] instanceof File)) {
        submitData.append(key, formData[key]);
      }
    });

    Object.keys(logoFiles).forEach((key) => {
      if (logoFiles[key] instanceof File) {
        submitData.append(key, logoFiles[key]);
      }
    });
    console.log(submitData);
    updateMutation.mutate(submitData);
  };

  const handleResetDefault = () => {
    if (
      window.confirm(
        "Are you sure you want to reset to default theme? This will override all current settings."
      )
    ) {
      resetMutation.mutate();
    }
  };

  useEffect(() => {
    return () => {
      Object.keys(logoFiles).forEach((key) => {
        if (
          key.includes("Preview") &&
          logoFiles[key] &&
          logoFiles[key].startsWith("blob:")
        ) {
          URL.revokeObjectURL(logoFiles[key]);
        }
      });
    };
  }, [logoFiles]);

  if (isLoadingTheme) {
    return <div>Loading theme settings...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FormField label="App Name" required>
          <Input
            placeholder="Type Name"
            value={formData.appName}
            onChange={(val) => handleChange("appName", val)}
          />
        </FormField>
      </form>

      <FormField label="Select Branding Style" required />
      <div className="flex gap-4">
        {["style1", "style2"].map((style, index) => (
          <div
            key={style}
            className={`cursor-pointer border-2 rounded-md ${
              formData.brandingStyle === style
                ? "border-brand"
                : "border-transparent"
            }`}
            onClick={() => handleChange("brandingStyle", style)}
          >
            <img
              src={index === 0 ? "/images/header1.png" : "/images/header2.png"}
              alt={style}
              className="h-38"
            />
          </div>
        ))}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* File upload fields with preview – unchanged UI */}
        {[
          { key: "lightModeLogo", label: "Light Mode Logo" },
          { key: "darkModeLogo", label: "Dark Mode Logo" },
          {
            key: "loginBackgroundImage",
            label: "Login Screen Background Image",
          },
          { key: "faviconImage", label: "Favicon Image" },
        ].map(({ key, label }) => (
          <FormField key={key} label={label} gap={4} required>
            <label
              className="h-20 border border-divider bg-surface2 rounded-lg flex justify-center items-center underline typo-b3 text-text2 cursor-pointer relative overflow-hidden"
              style={{
                backgroundImage: logoFiles[`${key}Preview`]
                  ? `url(${logoFiles[`${key}Preview`]})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {logoFiles[`${key}Preview`] && (
                <div className="absolute inset-0 bg-black/40" />
              )}
              <span
                className={`${
                  logoFiles[`${key}Preview`]
                    ? "bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                    : ""
                }`}
              >
                {logoFiles[`${key}Preview`] ? "Change" : "Upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(key, e.target.files[0])}
              />
            </label>
          </FormField>
        ))}

        <FormField label="Login Screen Logo's background Color" required>
          <Input
            placeholder="Enter Color"
            value={formData.loginLogoBgColor}
            onChange={(val) => handleChange("loginLogoBgColor", val)}
          />
        </FormField>

        <FormField label="Login Screen Logo's text Color.">
          <div className="flex typo-cta">
            {["Dark", "Light"].map((mode, idx) => (
              <label
                key={mode}
                className={`flex-1 h-12 flex items-center justify-center ${
                  formData.loginLogoTxtColor === mode
                    ? "bg-brand text-white"
                    : "bg-surface2 text-text2"
                } ${
                  idx === 0 ? "rounded-l-lg" : "rounded-r-lg"
                } cursor-pointer`}
              >
                <Input
                  type="radio"
                  name={`Login logo text color`}
                  className="hidden"
                  checked={formData.loginLogoTxtColor === mode}
                  onChange={() => handleChange("loginLogoTxtColor", mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </FormField>

        {/* Panels */}
        {["public", "admin", "employee", "client"].map((panel) => (
          <div
            key={panel}
            className="flex flex-col gap-4 md:col-span-2 lg:col-span-3"
          >
            <div className="typo-b1">
              {panel.charAt(0).toUpperCase() + panel.slice(1)} Panel Theme
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Primary Color" required>
                <Input
                  type="color"
                  value={formData[`${panel}PrimaryColor`]}
                  onChange={(val) => handleChange(`${panel}PrimaryColor`, val)}
                />
              </FormField>
              <FormField
                label={`${
                  panel.charAt(0).toUpperCase() + panel.slice(1)
                } Theme`}
              >
                <div className="flex typo-cta">
                  {["Dark", "Light"].map((mode, idx) => (
                    <label
                      key={mode}
                      className={`flex-1 h-12 flex items-center justify-center ${
                        formData[`${panel}Theme`] === mode
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text2"
                      } ${
                        idx === 0 ? "rounded-l-lg" : "rounded-r-lg"
                      } cursor-pointer`}
                    >
                      <Input
                        type="radio"
                        name={`${panel}Theme`}
                        className="hidden"
                        checked={formData[`${panel}Theme`] === mode}
                        onChange={() => handleChange(`${panel}Theme`, mode)}
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </FormField>
            </div>
          </div>
        ))}
      </form>

      <div className="border-b border-divider"></div>
      <div className="flex gap-4">
        <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </RedButton>
        <RedBorderButton
          type="button"
          onClick={handleResetDefault}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Use Default Theme"}
        </RedBorderButton>
      </div>
    </div>
  );
}

export default ThemeSetting;
