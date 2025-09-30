import React from "react";
import { Link } from "react-router";
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
import Icon from "../../components/Icon";
import {
  ChartHeader,
  RedBorderButton,
  RedButton,
} from "../../components/Component";
import PageTitle from "../../components/PageTitle";

function Reports() {
  const teamPerformance = [
    { name: "Tasks Assigned", sales: 19 },
    { name: "Tasks Completed", sales: 17 },
    { name: "Avg.  Completion Time", sales: 15 },
    { name: "Active", sales: 23 },
    { name: "Overdue", sales: 1 },
  ];

  const revenue = [
    { name: "Made", sales: 3000, color: "#8FC951" },
    { name: "Savings", sales: 3000, color: "#A88AED" },
    { name: "Tax", sales: 4000, color: "#FE4E4D" },
  ];

  const projectReport = [
    { name: "To Do", sales: 20, color: "#A88AED" },
    { name: "In progress", sales: 17, color: "#5EB7E0" },
    { name: "Review", sales: 15, color: "#FE4E4D" },
    { name: "Complete", sales: 23, color: "#8FC951" },
  ];

  const data = [
    { name: "To Do", sales: 20, color: "#A88AED" },
    { name: "In progress", sales: 17, color: "#5EB7E0" },
    { name: "Review", sales: 15, color: "#FE4E4D" },
    { name: "Complete", sales: 23, color: "#8FC951" },
  ];
  return (
    <div>
      <PageTitle title="Report" />
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        {/* Left buttons */}
        <div className="flex gap-2 lg:gap-4 flex-wrap justify-center lg:justify-start">
          <Link
            to="/services/add-tracker"
            className="flex-1 lg:flex-none min-w-[150px] lg:min-w-0"
          >
            <RedButton className="w-full lg:w-auto px-4">Download PDF</RedButton>
          </Link>
          <Link
            to="/services/add-tracker"
            className="flex-1 lg:flex-none min-w-[150px] lg:min-w-0"
          >
            <RedBorderButton className="w-full lg:w-auto">
              Download CSV
            </RedBorderButton>
          </Link>
        </div>

        {/* Right filters */}
        <div className="flex flex-wrap gap-2 lg:gap-4 py-1 justify-center lg:justify-end">
          <div className="h-10 flex-1 min-w-[150px] lg:min-w-[140px] px-2 py-1 border border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Status</div>
            <Icon name="arrow" />
          </div>
          <div className="h-10 flex-1 min-w-[150px] lg:min-w-[140px] px-2 py-1 border border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select Match</div>
            <Icon name="arrow" />
          </div>
          <div className="h-10 flex-1 min-w-[150px] lg:min-w-[140px] px-2 py-1 border border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select Client</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Team Performance Report */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Team Performance Report" />
          </div>
          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={teamPerformance}
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
                  tickFormatter={(tick) => (tick > 0 ? `${tick}` : "")}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
                <Bar dataKey="sales" barSize={80} radius={[4, 4, 4, 4]}>
                  {teamPerformance.map((entry, index) => (
                    <Cell key={index} fill="#A88AED" cursor="none" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Revenue:" keyValue="$10,000" />
          </div>
          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenue}
                  dataKey="sales"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%" // make responsive
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
            {revenue.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project report */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Project report:" keyValue="50" />
          </div>
          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectReport}
                  dataKey="sales"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%" // make responsive
                  paddingAngle={0}
                  label={({ name, sales }) => `${name} ${sales}`}
                >
                  {data.map((entry, index) => (
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
            {projectReport.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Analytics */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Task Analytics" />
          </div>
          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
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
                  tickFormatter={(tick) => (tick > 0 ? `${tick}` : "")}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
                <Bar dataKey="sales" barSize={80} radius={[4, 4, 4, 4]}>
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} cursor="none" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
