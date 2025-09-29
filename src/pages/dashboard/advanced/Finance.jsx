import Icon from "@/components/Icon";
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
import { ChartHeader, RedButton } from "@/components/Component";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";

function Finance() {
  const data = [
    { name: "Expenses", sales: 4000, color: "#FE4E4D" },
    { name: "Owner's pay", sales: 500, color: "#8FC951" },
    { name: "Taxes", sales: 250, color: "#A88AED" },
    { name: "Growth Fund", sales: 250, color: "#5EB7E0" },
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
          title="Total Earnings:"
          growth={23}
          value="$3000"
          desc="Month"
        />
        <MetricCard
          title="To Be Paid:"
          growth={23}
          value="$3000"
          desc="to Team"
        />
        <MetricCard
          title="Revenue:"
          growth={23}
          value="$3000"
          desc="This Month"
        />
        <MetricCard
          title="Business Expenses:"
          growth={23}
          value="$3000"
          desc="This Month"
        />
        <MetricCard
          title="Owner’s Pay:"
          growth={23}
          value="$3000"
          desc="This Month"
        />
        <MetricCard
          title="Taxes:"
          growth={23}
          value="$3000"
          desc="This Month"
        />
        <MetricCard
          title="Growth Fund:"
          growth={23}
          value="$3000"
          desc="This Month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* First */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="This Month’s Earnings:"
              keyValue="$9,000"
              secondaryLabel="+12% vs last month"
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deadlineData}
                barCategoryGap="30%"
                margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              >
                <XAxis
                  dataKey="Day"
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
                <Bar dataKey="Deadline" fill="#A88AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center md:justify-around gap-2">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]"></div>
              <span className="typo-b3 text-xs md:text-sm text-white">
                Deadline
              </span>
            </div>
          </div>
        </div>

        {/* Second */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Team Payment:"
              keyValue="$5,400"
              secondaryLabel="To team"
            />
            <div className="flex gap-2 flex-wrap">
              <FilterDropdown
                label="Team Member"
                options={["project one", "project two", "project three"]}
                className="h-7.5 border border-text2"
              />
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
                  data={data}
                  dataKey="sales"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%"
                  paddingAngle={0}
                  label={({ name, sales }) => `${name} $${sales}`}
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
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {data.map((item) => {
              const total = data.reduce((sum, d) => sum + d.sales, 0);
              const percentage = ((item.sales / total) * 100).toFixed(0);
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {item.name}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Third */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Payment:"
              keyValue="$5,400"
              secondaryLabel="From project "
            />
            <FilterDropdown
              label="Payment"
              options={["project one", "project two", "project three"]}
              className="h-7.5 border border-text2"
            />
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
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
                  outerRadius="80%"
                  paddingAngle={0}
                  label={({ name, sales }) => `${name} $${sales}`}
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
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {data.map((item) => {
              const total = data.reduce((sum, d) => sum + d.sales, 0);
              const percentage = ((item.sales / total) * 100).toFixed(0);
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {item.name}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fourth */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
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
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 10, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#7B7B7B", dy: 16 }}
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
                <Bar dataKey="sales" barSize={60} radius={[4, 4, 4, 4]}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} cursor="none" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {data.map((item) => {
              const total = data.reduce((sum, d) => sum + d.sales, 0);
              const percentage = ((item.sales / total) * 100).toFixed(0);
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {item.name}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Left */}
        <div className="w-full  bg-surface2 border-2 border-divider rounded-lg p-4 pb-2 flex flex-col gap-6">
          <div>Calculate Your Revenue:</div>
          <div className="typo-h2">5400.00</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevenueCard title="80% Business Expenses:" value={3200} />
            <RevenueCard title="10% Owner’s Pay:" value={540} />
            <RevenueCard title="5% Taxes:" value={270} />
            <RevenueCard title="5% Growth Fund:" value={270} />
          </div>
        </div>
      </div>

      {/* <div className="w-[368px] border-2 border-divider bg-surface2 rounded-lg p-4">
          <div>
            <div className="flex justify-between mb-4">
              <div>Amount Received:</div>
              <div className="typo-cta text-text2">See All</div>
            </div>
            <div className={`typo-h3 flex items-end gap-1 text-text`}>
              $2,500
              <p className="typo-b3 text-text2 pb-1"> from Client “Flexify</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <RedButton>Add Payment</RedButton>
          </div>
        </div> */}
    </div>
  );
}
const RevenueCard = ({ title, value }) => (
  <div className="flex-1 min-w-[200px] border-2 border-divider rounded-lg py-5.5 px-4 flex flex-col justify-between gap-6">
    <div className="typo-b3 text-text2">{title}</div>
    <div className="typo-h4">${value}</div>
  </div>
);
export default Finance;
