import React from "react";

const Calendar = ({ month, year, data }) => {
  // build an array of days for given month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // e.g. 31
  const firstDay = new Date(year, month, 1).getDay(); // weekday of 1st day

  // pad empty slots before first day
  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // lookup tasks by day
  const getTasks = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const entry = data.find((d) => d.date === dateStr);
    return entry ? entry.tasks : [];
  };

  return (
    <div className="w-full border border-divider rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 bg-surface">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center typo-b2 border-r border-divider last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="h-28 flex flex-col items-start p-2 border border-divider last:border-r-0"
          >
            {day && (
              <>
                <div className="text-sm font-semibold">{day}</div>
                <div className="mt-1 space-y-1">
                  {getTasks(day).map((task, i) => (
                    <div
                      key={i}
                      className="text-xs bg-surface2 rounded px-1 py-0.5"
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
