import { ChartHeader, Icon } from "@/components/Component";
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
import { FilterDropdown } from "../../../components/Component";

function Overview() {
  const chartData = [
    { name: "Progress", value: 80, color: "#5EB7E0" },
    { name: "not done", value: 20, color: "#7B7B7B" },
  ];
  const tasks = [
    { name: "Complete", sales: 2, color: "#8FC951" },
    { name: "In Progress", sales: 1, color: "#5EB7E0" },
    { name: "On Hold", sales: 1, color: "#A88AED" },
    { name: "Cancelled", sales: 1, color: "#FE4E4D" },
  ];
  const data = [
    { name: "Project Cost", sales: 4000, color: "#5EB7E0" },
    { name: "Payment", sales: 500, color: "#FE4E4D" },
    { name: "Earning", sales: 250, color: "#8FC951" },
  ];
  const revenue = [
    { name: "Made", sales: 4000, color: "#8FC951" },
    { name: "Savings", sales: 500, color: "#A88AED" },
    { name: "Taxes", sales: 250, color: "#5EB7E0" },
  ];
  const budget = [
    { name: "Project Budget", sales: 4000, color: "#5EB7E0" },
    { name: "Team Payment", sales: 500, color: "#FE4E4D" },
    { name: "Project Advance", sales: 250, color: "#A88AED" },
    { name: "Earning", sales: 250, color: "#8FC951" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <BorderDiv className="min-h-60">
        <div className="flex flex-col h-full md:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <ResponsiveContainer
              width="100%"
              height="100%"
              style={{ height: "200px" }}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="95%" // push center down
                  startAngle={180}
                  endAngle={0}
                  innerRadius="165%" // relative to container
                  outerRadius="180%" // relative to container
                  paddingAngle={0}
                  stroke="none"
                  labelLine={false}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number"
                      ? `$${value.toLocaleString()}`
                      : value
                  }
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center overlay */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <h2 className="typo-h4 mb-2 text-center">80%</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5EB7E0]"></div>
                <p className="typo-b3">In Progress</p>
              </div>
            </div>
          </div>
          {/* Right Info Box */}
          <div className="w-full md:w-[194px] flex flex-row md:flex-col justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-2 md:gap-4">
              <p className="typo-b2 text-text2">Start Date:</p>
              <h2 className="typo-h4">Aug 3, 2025</h2>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <p className="typo-b2 text-text2">Deadline:</p>
              <h2 className="typo-h4 text-brand">Aug 3, 2025</h2>
            </div>
          </div>
        </div>
      </BorderDiv>

      {/* The second BorderDiv component remains unchanged from the previous solution */}
      <BorderDiv className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={"/images/profile.png"}
          alt="profile"
          className="h-20 w-20 sm:h-40 sm:w-auto aspect-square object-cover rounded-sm"
        />
        <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
          <div className="typo-h4">Gustave Koelpin</div>
          <div className="typo-b2 text-text2">@example</div>
          <div className="typo-b2 text-text2">Total Project: 4</div>
          <div className="typo-b2 text-text2">Active Project: 2</div>
          <div className="w-[134px] h-8 flex items-center justify-center gap-2 border border-text2 rounded-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="typo-b3">complete</div>
            <div>
              <Icon name="arrow" />
            </div>
          </div>
        </div>
      </BorderDiv>
      {/* Chart 1 - Project Task (Pie Chart) */}
      <div className="w-full h-[400px] md:h-[468px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-3 md:gap-4">
        {/* Header */}
        <div className="flex justify-between">
          <ChartHeader primaryLabel="Project Task" keyValue="4" />
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tasks}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={0}
                stroke="none"
                outerRadius="75%"
                paddingAngle={0}
              >
                {tasks.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}`}
                contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {tasks.map((item) => {
            return (
              <div key={item.name} className="flex items-center gap-1 md:gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">
                  {item.name}: {item.sales}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2 - Project Budget (Bar Chart) */}
      <div className="w-full h-[400px] md:h-[468px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
        {/* Header */}
        <div className="flex justify-between">
          <ChartHeader primaryLabel="Project Budget" keyValue="$5,400" />
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
            >
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

              {/* Bars with individual colors */}
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
            return (
              <div key={item.name} className="flex items-center gap-1 md:gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 3 - Revenue (Bar Chart) */}
      <div className="w-full h-[400px] md:h-[468px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
        {/* Header */}
        <div className="flex justify-between">
          <ChartHeader primaryLabel="Revenue" keyValue="$5,400" />
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenue}
              margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
            >
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

              {/* Bars with individual colors */}
              <Bar dataKey="sales" barSize={60} radius={[4, 4, 4, 4]}>
                {revenue.map((entry, index) => (
                  <Cell key={index} fill={entry.color} cursor="none" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {revenue.map((item) => {
            const total = data.reduce((sum, d) => sum + d.sales, 0);
            const percentage = ((item.sales / total) * 100).toFixed(0);

            return (
              <div key={item.name} className="flex items-center gap-1 md:gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">
                  {percentage}% {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 4 - Project Track (Bar Chart) */}
      <div className="w-full h-[400px] md:h-[468px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <ChartHeader
            primaryLabel="Project Track"
            keyValue="$5,400"
            secondaryLabel="Project Budget"
          />
          <FilterDropdown
            label="Select Client"
            options={["project one", "project two", "project three"]}
            className="h-7.5 border border-text2"
          />
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budget}
              margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
            >
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

              {/* Bars with individual colors */}
              <Bar dataKey="sales" barSize={60} radius={[4, 4, 4, 4]}>
                {budget.map((entry, index) => (
                  <Cell key={index} fill={entry.color} cursor="none" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {budget.map((item) => {
            return (
              <div key={item.name} className="flex items-center gap-1 md:gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const BorderDiv = ({ className, children }) => (
  <div
    className={`border-2 border-divider rounded-lg bg-surface2 p-4 ${
      className || ""
    }`}
  >
    {children}
  </div>
);

export default Overview;
