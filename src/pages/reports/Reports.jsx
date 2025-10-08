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
import {
  useProjectsReport,
  useRevenueReport,
  useTaskReport,
  useTaskStageReport,
} from "../../hooks/useDashboard";
import Loading from "../../components/Loading";

function Reports() {
  const { data: tasksData = [], isPending: taskPendinng } = useTaskReport();
  const { data: revenueData, isPending: reveuePendinng } = useRevenueReport();
  const { data: projectData = [], isPending: projectPendinng } =
    useProjectsReport();
  const { data: stageData = [], isPending: stagePendinng } =
    useTaskStageReport();

  const revenue = [
    { name: "Expenses", sales: revenueData * (80 / 100), color: "#8FC951" },
    { name: "Owner's pay", sales: revenueData * (10 / 100), color: "#A88AED" },
    { name: "Taxes", sales: revenueData * (5 / 100), color: "#FE4E4D" },
    { name: "Growth Fund", sales: revenueData * (5 / 100), color: "#5EB7E0" },
  ];
  // console.log(stageData);

  const projectColor = {
    Active: "#5EB7E0",
    Overdue: "#FE4E4D",
    Completed: "#8FC951",
  };

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
            to="/admin/services/add-tracker"
            className="flex-1 lg:flex-none min-w-[150px] lg:min-w-0"
          >
            <RedButton className="w-full lg:w-auto px-4">
              Download PDF
            </RedButton>
          </Link>
          <Link
            to="/admin/services/add-tracker"
            className="flex-1 lg:flex-none min-w-[150px] lg:min-w-0"
          >
            <RedBorderButton className="w-full lg:w-auto">
              Download CSV
            </RedBorderButton>
          </Link>
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
          {taskPendinng ? (
            <Loading />
          ) : (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tasksData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="key"
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
                    formatter={(value, name, props) => [
                      `${value}`,
                      props.payload.key,
                    ]}
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="value" barSize={80} radius={[4, 4, 4, 4]}>
                    {tasksData.map((entry, index) => (
                      <Cell key={index} fill="#A88AED" cursor="none" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {/* {tasksData.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.key}</span>
              </div>
            ))} */}
            Day
          </div>
        </div>

        {/* Revenue */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Revenue" keyValue={`$${revenueData}`} />
          </div>
          {/* Chart */}
          {reveuePendinng ? (
            <Loading />
          ) : (
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
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
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

        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Project Report"
              keyValue={projectData.reduce((sum, d) => sum + d.value, 0)}
            />
          </div>

          {/* Chart */}
          {projectPendinng ? (
            <Loading />
          ) : (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectData}
                    dataKey="value"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    stroke="none"
                    outerRadius="80%"
                    paddingAngle={0}
                    label={({ key, value }) => `${key} ${value}`}
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={index} fill={projectColor[entry.key]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}`,
                      props.payload.key,
                    ]}
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {projectData.map((item) => {
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: projectColor[item.key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {item.key}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Analytics */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Task Analytics" />
          </div>
          {/* Chart */}
          {stagePendinng ? (
            <Loading />
          ) : (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <XAxis
                    dataKey="title"
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
                    formatter={(value, name, props) => [
                      `${value}`,
                      props.payload.title,
                    ]}
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" barSize={80} radius={[4, 4, 4, 4]}>
                    {stageData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} cursor="none" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {stageData.map((item) => (
              <div key={item.title} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="typo-b3">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
