function Activity() {
  const activityLog = [
    {
      month: "Aug",
      day: "22",
      time: "03:28 pm",
      activity: "New task added to the project.",
    },
    {
      month: "Aug",
      day: "22",
      time: "03:28 pm",
      activity: "Jhone Picke assigned for new Task",
    },
    {
      month: "Aug",
      day: "22",
      time: "03:28 pm",
      activity: "New task added to the project.",
    },
    {
      month: "Aug",
      day: "22",
      time: "03:28 pm",
      activity: "New task added to the project.",
    },
    {
      month: "Aug",
      day: "22",
      time: "03:28 pm",
      activity: "New task added to the project.",
    },
  ];

  return (
    <div className="flex flex-col gap-3 text-text">
      {activityLog.map((log, index) => (
        <div
          key={index}
          className="flex gap-2 items-center bg-surface2 rounded-sm p-2 border-2 border-divider"
        >
          <div className="w-16 h-16 typo-b3 rounded-sm border-2 border-divider flex flex-col justify-center items-center overflow-hidden">
            <div className="flex-1 flex items-center border-b border-divider w-full justify-center">
              {log.month}
            </div>
            <div className="flex-1 flex items-center w-full justify-center">
              {log.day}
            </div>
          </div>

          <div className="flex-1 typo-b2">
            <div className="mb-3">{log.activity}</div>
            <div className=" ">{log.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activity;
