import MetricCard from "@/components/MetricCard";
import PersonCard from "@/components/PersonCard";
import PageTitle from "../../components/PageTitle";
import { usePrivate, usePrivateCalander } from "../../hooks/useDashboard";
import Loading from "../../components/Loading";
import { useMe } from "../../hooks/useAuth";
import { Link } from "react-router";

function Private() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const { data: dashboard, isPending } = usePrivate();
  const { data: me, isPending: mePending } = useMe();
  const { data: calendarData = [], isPending: calanderPending } =
    usePrivateCalander();
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate(); 
  const todayDate = now.getDate();

  if (isPending) return <Loading />;
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Dashboard" />
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        {mePending ? (
          <Loading />
        ) : (
          <PersonCard
            name={me.profile.name}
            designation="Admin"
            // id={34556}
            image={me.profile?.profilePicture}
            active={true}
          ></PersonCard>
        )}
        <MetricCard
          title="Pending Task:"
          value={dashboard.tasks.pendingTasks}
        />
        <MetricCard
          title="Overdue Task:"
          value={dashboard.tasks.overdueTasks}
          color="red"
        />
        <MetricCard
          title="In Progress Projects:"
          value={dashboard.projects.activeProjects}
        />
        <MetricCard
          title="Overdue Projects:"
          value={dashboard.projects.overdueProjects}
          color="red"
        />
      </div>

      {/* <Calendar month={8} year={2025} data={tasks} /> */}
      <div className="bg-surface2 border-2 border-divider rounded-lg overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-7 min-w-[62rem]">
          {days.map((day) => (
            <div
              key={day}
              className="h-11.5 p-2 flex justify-center items-center typo-b3 font-medium border-r border-divider last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 min-w-[62rem]">
          {calanderPending ? (
            <Loading />
          ) : (
            Array.from({ length: 35 }).map((_, i) => {
              const date = i - firstDayIndex + 1;
              const projects = calendarData[date] || [];
              const isToday = date === todayDate;

              return (
                <div
                  key={i}
                  className={`h-40 flex items-stretch justify-between p-2 ${
                    (i + 1) % 7 ? "border-r" : ""
                  } ${i < 8 ? "" : "border-t"} ${
                    i > 27 ? "" : "border-b"
                  } border-divider last:border-r-0`}
                >
                  {date > 0 && date <= totalDays && (
                    <div className="flex flex-1 flex-row justify-between h-full w-full">
                      {/* Events */}
                      <div className="flex flex-col gap-1 p-2 text-xs sm:text-sm typo-b3">
                        {projects.map((p) => (
                          <Link
                            to={`/admin/projects/${p.id}/manage`}
                            key={p.id}
                          >
                            <div className="text-brand truncate">{p.name}</div>
                          </Link>
                        ))}
                      </div>

                      {/* Date */}
                      <div className="flex flex-col items-end justify-between p-2 typo-b1 h-full">
                        <div
                          className={`${
                            isToday
                              ? "bg-brand text-white rounded-sm px-2 py-1"
                              : "text-text2"
                          }`}
                        >
                          {date}
                        </div>
                        <div className="text-text2">
                          {new Date(year, month).toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(510px,1fr))] gap-2">
        {dashboard.birthdays.clients.length > 0 && (
          <DuelCardHolder title="Upcoming Client's Birthdays">
            {dashboard.birthdays.clients.map((per) => (
              <PersonCard
                name={per.name}
                designation="Client"
                id={34556}
                active={true}
              />
            ))}
          </DuelCardHolder>
        )}
        {dashboard.birthdays.freelancers.length > 0 && (
          <DuelCardHolder title="Upcoming Memmber's Birthdays">
            {dashboard.birthdays.freelancers.map((per) => (
              <PersonCard
                name={per.name}
                designation="Member"
                id={34556}
                active={true}
              />
            ))}
          </DuelCardHolder>
        )}
        {dashboard.lastAppreciations.length > 0 && (
          <DuelCardHolder title="Team Appreciations">
            {dashboard.lastAppreciations.map((per) => (
              <PersonCard
                name={per.name}
                designation="Member"
                id={34556}
                active={true}
              />
            ))}
          </DuelCardHolder>
        )}
        {dashboard.todaysJoining.length > 0 && (
          <DuelCardHolder title="Today's Joining">
            {dashboard.todaysJoining.map((per) => (
              <PersonCard
                name={per.name}
                designation="Member"
                id={34556}
                active={true}
              />
            ))}
          </DuelCardHolder>
        )}
        {dashboard.noticePeriodEnding.length > 0 && (
          <DuelCardHolder title="Notice Period Duration">
            {dashboard.noticePeriodEnding.map((per) => (
              <PersonCard
                name={per.name}
                designation="Member"
                // id={34556}
                // active={true}
              />
            ))}
          </DuelCardHolder>
        )}
        {dashboard.probationEnding.length > 0 && (
          <DuelCardHolder title="Probation Date">
            {dashboard.probationEnding.map((per) => (
              <PersonCard
                name={per.name}
                designation="Member"
                // id={34556}
                // active={true}
              />
            ))}
          </DuelCardHolder>
        )}
      </div>
    </div>
  );
}

const DuelCardHolder = ({ title, children }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-surface2 border-2 border-divider rounded-lg">
      <p className="typo-b2">{title}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-2">
        {/* <div className="grid grid-cols-[repeat(2,minmax(227px,1fr))] gap-2"> */}
        {children}
      </div>
    </div>
  );
};

export default Private;
