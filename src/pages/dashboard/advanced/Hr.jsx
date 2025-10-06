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
import HrTable from "@/components/HrTable";
import Icon from "@/components/Icon";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";
import {
  useHrAccountStat,
  useHrStat,
  useMemberProject,
} from "../../../hooks/dashboard";
import { useState } from "react";
import { Polyfills } from "tailwindcss";
function Hr() {
  const [projectPill, setProjectPill] = useState("week");
  const { data: hrStat } = useHrStat();
  const {
    totalMembers = 0,
    totalActiveMembers = 0,
    averageTasksPerMember = 0,
  } = hrStat || {};

  const { data: hraccountstat } = useHrAccountStat();

  const statusColor = {
    active: "#8FC951",
    inactive: "#A88AED",
    onLeave: "#5EB7E0",
  };
  const statusMap = {
    active: "Active",
    inactive: "Inactive",
    onLeave: "On Leave",
  };

  const { data: projectsData } = useMemberProject();
  const projects = projectsData?.[projectPill] || [];

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Members:"
          // growth={23}
          value={totalMembers}
          desc="Members"
        />
        <MetricCard
          title="Active Members:"
          // growth={23}
          value={totalActiveMembers}
          desc="Engaged Members"
        />
        <MetricCard
          title="Average Tasks:"
          // growth={23}
          value={averageTasksPerMember}
          desc="per Freelancer"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Members"
              keyValue={totalMembers}
              secondaryLabel="Members"
            />
            {/* <ToggleTabs
              options={["Month", "Project Based"]}
              defaultValue="Month"
              onChange={(val) => console.log("Selected:", val)}
            /> */}
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hraccountstat}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis
                  dataKey="Key"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#7B7B7B", dy: 16 }}
                  tickFormatter={(value) => statusMap[value] || value}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(tick) =>
                    tick >= 500
                      ? `${(tick / 1000).toFixed(1)}k`
                      : tick > 1
                      ? tick
                      : ""
                  }
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
                <Bar dataKey="value" barSize={80} radius={[4, 4, 4, 4]}>
                  {hraccountstat?.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={statusColor[entry.Key]}
                      cursor="none"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {hraccountstat?.map((item) => {
              return (
                <div
                  key={item.Key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColor[item.Key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {statusMap[item.Key] || item.key}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* second */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Tasks:"
              keyValue={projectsData?.summary[projectPill]}
              secondaryLabel={`This ${projectPill}`}
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => setProjectPill(val.toLowerCase())}
            />
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
      </div>

      <HrTable />
    </div>
  );
}

export default Hr;
