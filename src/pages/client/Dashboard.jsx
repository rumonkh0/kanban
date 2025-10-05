import MetricCard from "@/components/MetricCard";
import {
  ChartHeader,
  FilterDropdown,
  Icon,
  ToggleTabs,
} from "../../components/Component";
import PageTitle from "../../components/PageTitle";
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
function Dashboard() {
  const projects = [
    { name: "Complete", value: 2, color: "#8FC951" },
    { name: "In Progress", value: 1, color: "#5EB7E0" },
    { name: "On Hold", value: 1, color: "#A88AED" },
    { name: "Review", value: 1, color: "#FEEF4D" },
    { name: "Overdue", value: 1, color: "#FE4E4D" },
  ];
  const payment = [
    { name: "Payment", value: 500, color: "#FE4E4D" },
    { name: "Paid", value: 250, color: "#8FC951" },
    { name: "Owed", value: 400, color: "#A88AED" },
  ];
  return (
    <>
      <PageTitle title="Client Dashboard" />
      <div className="flex flex-col gap-4">
        {/* <div className="flex gap-2 flex-wrap"> */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
          <MetricCard title="Total Project:" value="$3000" desc="Month" />
          <MetricCard
            title="Acrive Project:"
            growth={23}
            value="$3000"
            desc="Month"
          />
          <MetricCard
            title="Complete Project:"
            growth={23}
            value="$3000"
            desc="Month"
          />
          <MetricCard title="Due Project:" growth={23} value="3" desc="Month" />
          <MetricCard title="Project Active Task:" growth={23} value="2" />
          <MetricCard
            title="Total Payment"
            growth={23}
            value="$3000"
            desc="Total"
          />
          <MetricCard title="Paid:" growth={23} value="$3" />
          <MetricCard title="Owed:" value="$3" />
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
  {/* projects */}
  <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
      <ChartHeader primaryLabel="Total Project:" keyValue="50" />
      <ToggleTabs
        options={["Month", "Project Based"]}
        defaultValue="Month"
        onChange={(val) => console.log("Selected:", val)}
      />
    </div>

    {/* Chart */}
    <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={projects}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            stroke="none"
            outerRadius="90%" // responsive size
            paddingAngle={0}
            label={({ name, value }) => `${name} ${value}`}
          >
            {projects.map((entry, index) => (
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
      {projects.map((item) => (
        <div key={item.name} className="flex items-center gap-1 md:gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="typo-b3 text-xs md:text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* payment */}
  <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
      <ChartHeader
        primaryLabel="This Month’s Revenue"
        keyValue="$5,400"
        secondaryLabel="+12% vs last month"
      />

      <div className="flex gap-2 flex-wrap">
        <FilterDropdown
          label="Select Project"
          options={["project one", "project two", "project three"]}
          className="h-7.5"
        />
        <ToggleTabs
          options={["Week", "Month", "Year"]}
          defaultValue="Week"
          onChange={(val) => console.log("Selected:", val)}
        />
      </div>
    </div>

    {/* Chart */}
    <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={payment}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
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
              tick >= 5 ? `${(tick / 1000).toFixed(1)}k` : tick
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#F3F4F6",
              borderRadius: 8,
            }}
          />

          {/* Bars with individual colors */}
          <Bar dataKey="value" barSize={60} radius={[4, 4, 4, 4]}>
            {payment.map((entry, index) => (
              <Cell key={index} fill={entry.color} cursor="none" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
      {payment.map((item) => (
        <div key={item.name} className="flex items-center gap-1 md:gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="typo-b3 text-xs md:text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </>
  );
}

export default Dashboard;
