import { useParams } from "react-router";
import { useProjectActivity } from "../../../hooks/useProjects";
import moment from "moment";

function Activity() {
  const { id } = useParams();
  const { data: activityLog = [], isPending } = useProjectActivity(id);

  if (isPending)
    return <div className="typo-h1 text-center">Loading Activities</div>;

  if (activityLog.length === 0) return <div>No Activity Found.</div>;

  return (
    <div className="flex flex-col gap-3 text-text">
      {activityLog.map((log, index) => {
        const date = moment(log.date);
        const month = date.format("MMM"); // Jan, Feb, ...
        const day = date.format("DD"); // 01, 02, ...
        const time = date.format("hh:mm A"); // 09:30 AM
        const relative = date.fromNow(); // e.g. "2 hours ago"

        return (
          <div
            key={index}
            className="flex gap-2 items-center bg-surface2 rounded-sm p-2 border-2 border-divider"
          >
            <div className="w-16 h-16 typo-b3 rounded-sm border-2 border-divider flex flex-col justify-center items-center overflow-hidden">
              <div className="flex-1 flex items-center border-b border-divider w-full justify-center">
                {month}
              </div>
              <div className="flex-1 flex items-center w-full justify-center">
                {day}
              </div>
            </div>

            <div className="flex-1 typo-b2">
              <div className="mb-3">{log.title}</div>
              <div>
                {time} &middot; <span className="text-text2">{relative}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Activity;
