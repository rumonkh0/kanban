import MetricCard from "@/components/MetricCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { ChartHeader } from "@/components/Component";
import Icon from "@/components/Icon";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";
import {
  useProjectActivity,
  useProjectDeadline,
  useProjectStat,
} from "../../../hooks/useDashboard";
import { useState } from "react";

function Projects() {
  const [projectPill, setProjectPill] = useState("week");
  const [deadlinePill, setDeadlinePill] = useState("week");
  const { data: projectStat } = useProjectStat();
  const {
    totalProjects = 0,
    activeProjects = 0,
    onHoldProjects = 0,
    completedProjects = 0,
    avgActiveProjectProgress = 0,
  } = projectStat || {};
  const { data: projectActivity } = useProjectActivity();
  const projects = projectActivity?.[projectPill] || [];
  const projectProgress = [
    {
      Key: "Progress",
      value: avgActiveProjectProgress,
    },
    {
      Key: "Due",
      value: 100 - avgActiveProjectProgress,
    },
  ];

  const progressColor = {
    Progress: "#8FC951",
    Due: "#FE4E4D",
  };

  const { data: projectDeadline } = useProjectDeadline();
  const deadlines = projectDeadline?.[deadlinePill] || [];
  const totalDeadlines = deadlines.reduce((sum, d) => sum + d.DeadlineCount, 0);
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Projects:"
          // growth={23}
          value={totalProjects}
          desc="Projects"
        />
        <MetricCard
          title="Active Projects:"
          // growth={23}
          value={activeProjects}
          desc="Ongoing Projects"
        />
        <MetricCard
          title="Completed Projects:"
          // growth={23}
          value={completedProjects}
          desc="Completed Projects"
        />
        <MetricCard
          title="On Hold Projects:"
          // growth={23}
          value={onHoldProjects}
          desc="per Clients"
        />
        <MetricCard
          title="Average Progress:"
          growth={23}
          value={`${avgActiveProjectProgress}%`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Projects:"
              keyValue={projectActivity?.summary[projectPill]}
              secondaryLabel={`Projects of This ${projectPill}`}
            />
            <div className="flex gap-2 flex-wrap">
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Week"
                onChange={(val) => setProjectPill(val.toLowerCase())}
              />
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projects}
                barCategoryGap="20%"
                margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              >
                <XAxis
                  dataKey="Key"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#7B7B7B", dy: 16 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  domain={[1, "auto"]}
                  tickFormatter={(value) => (value === 0 ? "" : value)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 8,
                    border: "none",
                  }}
                />
                <Bar dataKey="active" fill="#5EB7E0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#8FC951" radius={[4, 4, 0, 0]} />
                <Bar dataKey="due" fill="#FE4E4D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-1 md:gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#5EB7E0" }}
              ></div>
              <span className="typo-b3 text-white text-xs md:text-sm">
                Active
              </span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#8FC951" }}
              ></div>
              <span className="typo-b3 text-white text-xs md:text-sm">
                Completed
              </span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FE4E4D" }}
              ></div>
              <span className="typo-b3 text-white text-xs md:text-sm">Due</span>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Average Progress:"
              keyValue={`${avgActiveProjectProgress}%`}
            />
            <div className="flex gap-2 flex-wrap">
              <FilterDropdown
                label="Select Project"
                options={["project one", "project two", "project three"]}
                className="h-7.5 border border-text2"
              />
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectProgress}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%"
                  paddingAngle={0}
                  label={({ Key, value }) => `${Key} ${value}%`}
                >
                  {projectProgress.map((entry, index) => (
                    <Cell key={index} fill={progressColor[entry.Key]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    props.payload.Key,
                  ]}
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {projectProgress.map((item) => {
              return (
                <div
                  key={item.Key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: progressColor[item.Key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {item.Key}: {item.value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* third */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Deadlines"
              keyValue={totalDeadlines}
              secondaryLabel={`Project Deadlines ${deadlinePill}`}
            />
            <div className="flex gap-2 flex-wrap">
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Week"
                onChange={(val) => setDeadlinePill(val.toLowerCase())}
              />
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deadlines}
                barCategoryGap="30%"
                margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              >
                <XAxis
                  dataKey="Key"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#7B7B7B", dy: 16 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  domain={[1, "auto"]}
                  tickFormatter={(value) => (value === 0 ? "" : value)}
                />
                <Tooltip
                  formatter={(value) => `${value} deadlines`}
                  contentStyle={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 8,
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="DeadlineCount"
                  fill="#A88AED"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-around">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]"></div>
              <span className="typo-b3 text-white text-xs md:text-sm">
                Deadline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
