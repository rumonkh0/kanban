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
function Hr() {
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

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Members:"
          growth={23}
          value="20"
          desc="Members"
        />
        <MetricCard
          title="Active Members:"
          growth={23}
          value="20"
          desc="Engaged Members"
        />
        <MetricCard
          title="Average Tasks:"
          growth={23}
          value="1.0"
          desc="per Freelancer"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="This Month’s Revenue"
              keyValue="$5,400"
              secondaryLabel="+12% vs last month"
            />

            <ToggleTabs
              options={["Month", "Project Based"]}
              defaultValue="Month"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#7B7B7B", dy: 16 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(tick) =>
                    tick >= 500 ? `${(tick / 1000).toFixed(1)}k` : ""
                  }
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />

                {/* Bars with individual colors */}
                <Bar dataKey="sales" barSize={80} radius={[4, 4, 4, 4]}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} cursor="none" />
                  ))}
                </Bar>
              </BarChart>
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
                    style={{
                      backgroundColor: item.color,
                    }}
                  ></div>
                  <span className="typo-b3">
                    {item.name}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* second */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Total Tasks:"
              keyValue="32"
              secondaryLabel="This month"
            />
            <FilterDropdown
              label="Select group"
              options={["project one", "project two", "project three"]}
              className="h-7.5 border border-text2 "
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
      </div>
      <HrTable />
    </div>
  );
}

export default Hr;
