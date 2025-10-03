import { useState, useEffect } from "react";
import {
  FormField,
  Input,
  RedBorderButton,
  RedButton,
} from "../../components/Component";

import {
  useThemeSetting,
  useEditThemeSetting,
  // useResetThemeSetting
} from "../../hooks/useSettings";

function ThemeSetting() {
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
    }
  };

  // 2. FETCH THEME SETTINGS using custom hook
  const { data: themeData, isLoading: isLoadingTheme } = useThemeSetting();

  useEffect(() => {
    if (themeData)
      setFormData({
        appName: themeData.appName || "",
        brandingStyle: themeData.brandingStyle || "style1",
        lightModeLogo: null,
        darkModeLogo: null,
        loginBackgroundImage: null,
        faviconImage: null,
        loginLogoBgColor: themeData.loginLogoBgColor || "",
        loginLogoTxtColor: themeData.loginLogoTxtColor || "Dark",
        defaultTheme: themeData.defaultTheme || "Dark",
        publicPrimaryColor: themeData.publicPrimaryColor || "#000000",
        publicTheme: themeData.publicTheme || "Dark",
        adminPrimaryColor: themeData.adminPrimaryColor || "#000000",
        adminTheme: themeData.adminTheme || "Dark",
        employeePrimaryColor: themeData.employeePrimaryColor || "#000000",
        employeeTheme: themeData.employeeTheme || "Dark",
        clientPrimaryColor: themeData.clientPrimaryColor || "#000000",
        clientTheme: themeData.clientTheme || "Dark",
      });
  }, [themeData]);

  const updateMutation = useEditThemeSetting();
  // const resetMutation = useResetThemeSetting();

  const isLoading = updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.appName) {
      alert("Please fill in the app name.");
      return;
    }

    const submitData = new FormData();

    // Append non-file data
    Object.keys(formData).forEach((key) => {
      if (
        key !== "lightModeLogo" &&
        key !== "darkModeLogo" &&
        key !== "loginBackgroundImage" &&
        key !== "faviconImage" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        submitData.append(key, formData[key]);
      }
    });

    // Append file data from logoFiles
    Object.keys(logoFiles).forEach((key) => {
      if (logoFiles[key] instanceof File) {
        submitData.append(key, logoFiles[key]);
      }
    });


    // Execute mutation
    updateMutation.mutate(submitData, {
      onSuccess: () => {
        alert("Theme settings updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating theme settings:", error);
        alert("Failed to update theme settings. Please try again.");
      },
    });
  };

  // const handleResetDefault = () => {
  //   // IMPORTANT: Since window.confirm is restricted, we simulate the action flow.
  //   // In a final application, this should be replaced by a custom modal dialog.
  //   if (confirm("Are you sure you want to reset to default theme? This will override all current settings.")) {
  //       resetMutation.mutate(null, {
  //           onSuccess: () => {
  //               alert("Theme reset to default successfully!");
  //           },
  //           onError: (error) => {
  //               console.error("Error resetting theme:", error);
  //               alert("Failed to reset theme. Please try again.");
  //           },
  //       });
  //   }
  // };

  useEffect(() => {
    // Cleanup function for blob URLs
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
            type="color" // Changed to type color for better UX
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
          // onClick={handleResetDefault}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Use Default Theme"}
        </RedBorderButton>
      </div>
    </div>
  );
}

export default ThemeSetting;
