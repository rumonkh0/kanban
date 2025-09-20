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

function Projects() {
  const data = [
    { name: "Expenses", sales: 4000, color: "#FE4E4D" },
    { name: "Owner's pay", sales: 500, color: "#8FC951" },
    { name: "Taxes", sales: 250, color: "#A88AED" },
    { name: "Growth Fund", sales: 250, color: "#5EB7E0" },
  ];
  const weekdata = [
    { Day: "Mon", Active: 5, Completed: 2, Due: 1 },
    { Day: "Tue", Active: 3, Completed: 4, Due: 2 },
    { Day: "Wed", Active: 4, Completed: 3, Due: 3 },
    { Day: "Thu", Active: 6, Completed: 5, Due: 0 },
    { Day: "Fri", Active: 2, Completed: 6, Due: 1 },
    { Day: "Sat", Active: 1, Completed: 3, Due: 2 },
    { Day: "Sun", Active: 0, Completed: 2, Due: 4 },
  ];
  const deadlineData = [
    { Day: "Mon", Deadline: 5 },
    { Day: "Tue", Deadline: 3 },
    { Day: "Wed", Deadline: 4 },
    { Day: "Thu", Deadline: 6 },
    { Day: "Fri", Deadline: 2 },
    { Day: "Sat", Deadline: 1 },
    { Day: "Sun", Deadline: 0 },
  ];
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Projects:"
          growth={23}
          value="42"
          desc="Projects"
        />
        <MetricCard
          title="Active Projects:"
          growth={23}
          value="42"
          desc="Ongoing Projects"
        />
        <MetricCard
          title="Completed Projects:"
          growth={23}
          value="42"
          desc="Completed Projects"
        />
        <MetricCard
          title="On Hold Projects:"
          growth={23}
          value="42"
          desc="per Clients"
        />
        <MetricCard title="Average Progress:" growth={23} value="75%" />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {/* first */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Total Projects:"
              keyValue="72"
              secondaryLabel="Projects of This month"
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdata} barCategoryGap="20%">
                <XAxis
                  dataKey="Day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#7B7B7B", dy: 16 }}
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
                <Bar dataKey="Active" fill="#5EB7E0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Completed" fill="#8FC951" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Due" fill="#FE4E4D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#5EB7E0" }}
              ></div>
              <span className="typo-b3 text-white">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#8FC951" }}
              ></div>
              <span className="typo-b3 text-white">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FE4E4D" }}
              ></div>
              <span className="typo-b3 text-white">Due</span>
            </div>
          </div>
        </div>
        {/* second */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Average Progress:" keyValue="72%" />
            <FilterDropdown
              label="Select Project"
              options={["project one", "project two", "project three"]}
              className="h-7.5 border border-text2 "
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="sales"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius={200}
                  paddingAngle={0}
                  label={({ name, sales }) => `${name} $${sales}`}
                  // labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value}`}
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 flex-wrap">
            {data.map((item) => {
              const total = data.reduce((sum, d) => sum + d.sales, 0);
              const percentage = ((item.sales / total) * 100).toFixed(0);

              return (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="typo-b3">
                    {item.name}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* third */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Deadlines"
              keyValue="4"
              secondaryLabel="Project Deadlines Today"
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadlineData} barCategoryGap="30%">
                <XAxis
                  dataKey="Day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#7B7B7B", dy: 16 }}
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
                <Bar dataKey="Deadline" fill="#A88AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]"></div>
              <span className="typo-b3 text-white">Deadline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
