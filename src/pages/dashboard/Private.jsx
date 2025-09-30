import MetricCard from "@/components/MetricCard";
import PersonCard from "@/components/PersonCard";
import PageTitle from "../../components/PageTitle";

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

  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Dashboard" />
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <PersonCard
          name="creativezethdesign"
          designation="Admin"
          id={34556}
          active={true}
        />
        <MetricCard title="Pending Task:" value={0} />
        <MetricCard title="Overdue Task:" value={0} color="red" />
        <MetricCard title="In Progress Projects:" growth={22} value={0} />
        <MetricCard
          title="Overdue Projects:"
          value={0}
          growth={-23}
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
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={`h-40 flex items-stretch justify-between p-2 ${
                (i + 1) % 7 ? "border-r" : ""
              } ${i < 8 ? "" : "border-t"} ${
                i > 27 ? "" : "border-b"
              } border-divider last:border-r-0`}
            >
              {i < 30 && (
                <div className="flex flex-1 flex-col justify-between h-full w-full">
                  {/* Event/data on the left */}
                  <div className="flex flex-col gap-1 p-2 text-xs sm:text-sm typo-b3">
                    {i == 9 && (
                      <>
                        <div className="text-text2">10:20</div>
                        <div>Management in Parliament</div>
                      </>
                    )}
                  </div>

                  {/* Date on top, month at bottom (right side) */}
                  <div className="flex flex-col items-end justify-between p-2 typo-b1 h-full">
                    <div
                      className={`${
                        i == 9
                          ? "bg-brand rounded-sm text-white px-2 py-1"
                          : "text-text2"
                      }`}
                    >
                      {i + 1} {/* Date */}
                    </div>
                    <div className="text-text2">{/* Month */}July</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(510px,1fr))] gap-2">
        <DuelCardHolder title="Upcoming Birthdays">
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            active={true}
          />
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            active={true}
          />
        </DuelCardHolder>
        <DuelCardHolder title="Team Appreciations">
          <PersonCard
            name="creativezethdesign"
            date=" Jul 20, 2025"
            award="Designer of the year"
          />
          <PersonCard
            name="creativezethdesign"
            date=" Jul 20, 2025"
            award="Designer of the year"
          />
        </DuelCardHolder>
        <DuelCardHolder title="On Leave Today">
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            returning=" Jul 20, 2025"
          />
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            returning=" Jul 20, 2025"
          />
        </DuelCardHolder>
        <DuelCardHolder title="Today's Joining & Work Anniversary">
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            joining=" Jul 20, 2025"
          />
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            id={34556}
            joining=" Jul 20, 2025"
          />
        </DuelCardHolder>
        <DuelCardHolder title="Notice Period Duration">
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            start=" Jul 20, 2025"
            end=" Jul 20, 2025"
          />
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            start=" Jul 20, 2025"
            end=" Jul 20, 2025"
          />
        </DuelCardHolder>
        <DuelCardHolder title="Probation Date">
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            start=" Jul 20, 2025"
            end=" Jul 20, 2025"
          />
          <PersonCard
            name="creativezethdesign"
            designation="Admin"
            start=" Jul 20, 2025"
            end=" Jul 20, 2025"
          />
        </DuelCardHolder>
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
