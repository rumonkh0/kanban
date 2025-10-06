import MetricCard from "@/components/MetricCard";
import {
  ChartHeader,
  FilterDropdown,
  Icon,
  ToggleTabs,
} from "../../components/Component";
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
import {
  useFreelancerEarningsStats,
  useFreelancerStats,
  useFreelancerTaskSummary,
} from "../../hooks/useDashboard";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
function Dashboard() {
  const [taskPill, setTaskPill] = useState("week");
  const freelancerId = useAuthStore((state) => state.user.user._id);
  const { data: stats } = useFreelancerStats(freelancerId);
  const {
    totalEarnings = 0,
    totalPaid = 0,
    totalOwed = 0,
    totalTasks = 0,
    totalDueTasks = 0,
    totalOverdueTasks = 0,
    totalCompletedTasks = 0,
  } = stats || {};
  const { data: tasksData } = useFreelancerTaskSummary(freelancerId);
  const tasks = tasksData?.[taskPill] || [];
  const totalTask = tasks.reduce((sum, d) => sum + d.value, 0);
  const statColor = {
    Active: "#5EB7E0",
    Complete: "#8FC951",
    Overdue: "#FE4E4D",
  };
  const { data: earningsData = [] } = useFreelancerEarningsStats(freelancerId);
  const earningColor = {
    "Total Earnings": "#8FC951",
    "Total Owed": "#A88AED",
    "Total Paid": "#5EB7E0",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Earnings:"
          growth={23}
          value={totalEarnings}
          desc="Month"
        />
        <MetricCard
          title="Amount Paid:"
          growth={23}
          value={totalPaid}
          desc="Month"
        />
        <MetricCard
          title="Amount Owed:"
          growth={23}
          value={totalOwed}
          desc="Month"
        />
        <MetricCard
          title="Total Task:"
          growth={23}
          value={totalTasks}
          desc="Month"
        />
        <MetricCard title="Active Task:" growth={23} value={totalDueTasks} />
        <MetricCard
          title="Overdue Task:"
          growth={23}
          value={totalOverdueTasks}
        />
        <MetricCard
          title="Complete Task:"
          growth={23}
          value={totalCompletedTasks}
          desc="Month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Total task */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Task"
              keyValue={totalTask}
              secondaryLabel={`in ${taskPill}`}
            />

            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Month"
              onChange={(val) => setTaskPill(val.toLowerCase())}
            />
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasks}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="90%"
                  paddingAngle={0}
                  label={({ key, value }) => `${key} ${value}`}
                >
                  {tasks.map((entry, index) => (
                    <Cell key={index} fill={statColor[entry.key]} />
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
                <div
                  key={item.key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statColor[item.key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">{item.key}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* earnings */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Enrings"
              keyValue={earningsData[0]?.["Total Earnings"] || 0}
              // secondaryLabel="+12% vs last month"
            />

            <div className="flex gap-2 flex-wrap">
              {/* <FilterDropdown
                label="Select Project"
                options={["project one", "project two", "project three"]}
                className="h-7.5"
              /> */}
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={earningsData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis
                  dataKey="key"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#7B7B7B", dy: 16 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(tick) =>
                    tick >= 500 ? `${(tick / 1000).toFixed(1)}k` : tick
                  }
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />

                <Bar dataKey="value" barSize={60} radius={[4, 4, 4, 4]}>
                  {earningsData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={earningColor[entry.key]}
                      cursor="none"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {earningsData.map((item) => {
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: earningColor[item.key],
                    }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">{item.key}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
