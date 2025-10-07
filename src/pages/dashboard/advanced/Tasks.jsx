import { Link } from "react-router";
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
import TaskTable from "@/components/TaskTable";
import { ToggleTabs } from "../../../components/Component";
import {
  useTaskActivity,
  useTaskDeadline,
  useTaskStat,
} from "../../../hooks/useDashboard";
import { useState } from "react";

function Tasks() {
  const [taskPill, setTaskPill] = useState("week");
  const [deadlinePill, setDeadlinePill] = useState("week");
  const { data: taskStat } = useTaskStat();
  const {
    completedTasks = 5,
    dueTasks = 0,
    overdueTasks = 0,
    totalTasks = 5,
  } = taskStat || {};

  const { data: taskActivity } = useTaskActivity();
  const tasks = taskActivity?.[taskPill] || [];

  const { data: taskDeadline } = useTaskDeadline();
  const deadlines = taskDeadline?.[deadlinePill] || [];
  const totalDeadline = deadlines.reduce((sum, d) => sum + d.DeadlineCount, 0);
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Tasks:"
          // growth={23}
          value={totalTasks}
          desc="Tasks"
        />
        <MetricCard
          title="Tasks Due:"
          // growth={23}
          value={dueTasks}
          desc="Tasks Due Today"
        />
        <MetricCard
          title="Overdue Tasks:"
          // growth={23}
          value={overdueTasks}
          desc="Clients"
          color="red"
        />
        <MetricCard
          title="Completed Tasks:"
          // growth={23}
          value={completedTasks}
          desc="This Month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Tasks"
              keyValue={taskActivity?.summary[taskPill]}
              secondaryLabel={`This ${taskPill}`}
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => setTaskPill(val.toLowerCase())}
            />
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tasks}
                barCategoryGap="20%"
                margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              >
                <XAxis
                  dataKey="Key"
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
                <Bar dataKey="active" fill="#5EB7E0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#8FC951" radius={[4, 4, 0, 0]} />
                <Bar dataKey="due" fill="#FE4E4D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#5EB7E0" }}
              />
              <span className="typo-b3 text-white text-xs md:text-sm">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#8FC951" }}
              />
              <span className="typo-b3 text-white text-xs md:text-sm">
                Completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FE4E4D" }}
              />
              <span className="typo-b3 text-white text-xs md:text-sm">Due</span>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Tasks Due"
              keyValue={totalDeadline}
              secondaryLabel={`Due task ${deadlinePill}`}
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => setDeadlinePill(val.toLowerCase())}
            />
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
                <Bar
                  dataKey="DeadlineCount"
                  fill="#A88AED"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]" />
              <span className="typo-b3 text-white text-xs md:text-sm">
                Deadline
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="typo-b1">Tasks</h2>
          <Link to="/admin/tasks" className="typo-cta text-text2">
            See All
          </Link>
        </div>
        <TaskTable />
      </div>
    </div>
  );
}

export default Tasks;
