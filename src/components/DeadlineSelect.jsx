import React from "react";

export default function DeadlineSelect({ onChange }) {
  const [hasDeadline, setHasDeadline] = React.useState(true);
  const [date, setDate] = React.useState("");

  const handleCheckboxChange = (e) => {
    setHasDeadline(!e.target.checked);
    if (e.target.checked) {
      setDate("");
      if (onChange) onChange(null);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="typo-b2 text-text2">Project Deadline</label>

      <div className="flex flex-col gap-3">
        {/* No Deadline Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!hasDeadline}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-brand rounded border-divider bg-surface2 focus:ring-brand focus:ring-offset-0"
          />
          <span className="typo-b3 text-text2">Without Due Date</span>
        </label>

        {/* Date Input */}
        {hasDeadline && (
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              placeholder="Select Date"
            />
          </div>
        )}
      </div>
    </div>
  );
}
