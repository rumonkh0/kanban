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
