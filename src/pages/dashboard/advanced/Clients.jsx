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
import ClientTable from "@/pages/clients/ClientTable";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";
function page() {
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
          title="Total Clients:"
          growth={23}
          value="10"
          desc="Clients"
        />
        <MetricCard
          title="Active Clients:"
          growth={23}
          value="10"
          desc=" Engaged Clients"
        />
        <MetricCard
          title="Inactive Clients:"
          growth={23}
          value="10"
          desc="Clients"
        />
        <MetricCard
          title="Average Projects:"
          growth={23}
          value="10"
          desc="Per Clients"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Payment Owed"
              keyValue="$5,400"
              secondaryLabel="From Clints"
            />
            <FilterDropdown
              label="Clients"
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
        {/* second */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Total Clients"
              keyValue="7"
              secondaryLabel=""
            />
            <div className="flex gap-4">
              <FilterDropdown
                label="Select Client"
                options={["project one", "project two", "project three"]}
                className="h-7.5 border border-text2 "
              />
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Week"
                onChange={(val) => console.log("Selected:", val)}
              />
            </div>
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
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="typo-b1">Clients</h2>
          <Link to="#" className="typo-cta text-text2">
            See All
          </Link>
        </div>
        <ClientTable />
      </div>
      <ToastContainer />
    </div>
  );
}

export default page;
