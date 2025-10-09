const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
export const FormatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const upFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getProfileImageUrl = (
  fileData,
  defaultPath = "/images/profile.png"
) => {
  const filePath = fileData?.filePath;

  if (filePath) {
    return `${baseURL}/${filePath}`;
  }

  return defaultPath;
};

export const ConditionalPieLabel = ({ name, value }) => {
  // Use Number() to safely handle null/undefined/zero strings
  const val = Number(value);

  // Return null if the value is 0, which prevents the label from rendering.
  if (isNaN(val) || val === 0) {
    return null;
  }

  // Otherwise, return the desired label format
  return `${name} : $${value}`;
};
