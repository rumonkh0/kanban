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
import { ChartHeader } from "@/components/Component";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";
import {
  useOverviewDeadline,
  useOverviewFinance,
  useOverviewStat,
  useOverviewTasks,
} from "../../../hooks/dashboard";
import { useState } from "react";
import { upFirst } from "../../../utils/utils";

function Overview() {
  const [taskPill, setTaskPill] = useState("week");
  const [deadlinePill, setDeadlinePill] = useState("week");
  const { data: stat } = useOverviewStat();
  const {
    revenue = 0,
    toBePaid = 0,
    totalEarnings = 0,
    totalActiveFreelancers = 0,
  } = stat || {};

  const revenueChart = [
    { key: "Expenses", value: revenue * (80 / 100) },
    { key: "Owner's pay", value: revenue * (10 / 100) },
    { key: "Taxes", value: revenue * (5 / 100) },
    { key: "Growth Fund", value: revenue * (5 / 100) },
  ];
  const revenueColor = {
    Expenses: "#FE4E4D",
    "Owner's pay": "#8FC951",
    Taxes: "#A88AED",
    "Growth Fund": "#5EB7E0",
  };

  const { data: overfinance } = useOverviewFinance();
  const TeamPayment = overfinance?.team || [];

  const paymentColor = {
    paid: "#8FC951",
    owed: "#FE4E4D",
  };

  const { data: taskData } = useOverviewTasks();
  const tasks = taskData?.[taskPill] || [];

  const { data: deadlineData } = useOverviewDeadline();
  const deadlines = deadlineData?.[deadlinePill] || [];
  const totalDeadline = deadlines.reduce((sum, d) => sum + d.DeadlineCount, 0);
  const projects = [
    {
      client: "Gustave KoeIpin",
      project: "Branding Redesign",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Professional WordPress Website",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Basic Logo Package",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Basic Logo Package",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Starter Deck",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "One-Page WordPress Website",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Branding Redesign",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Branding Redesign",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
    {
      client: "Gustave KoeIpin",
      project: "Branding Redesign",
      teamMembers: "Gustave KoeIpin",
      status: "Complete",
    },
  ];

  const activities = [
    {
      timestamp: "Today, 09:45 AM",
      action: 'Sarah M. completed task "UI Prototype – Home Page"',
    },
    {
      timestamp: "Today, 09:45 AM",
      action: 'Sarah M. completed task "UI Prototype – Home Page"',
    },
    {
      timestamp: "Yesterday, 04:30 PM",
      action: "New revenue entry of $2,500 added for Project Flexify",
    },
    {
      timestamp: "Yesterday, 11:15 AM",
      action: "Client Zenwell Ltd assigned to Freelancer Ayaan H",
    },
    {
      timestamp: "Aug 5, 06:22 PM",
      action: 'Task "Fix Mobile Navbar" moved to Review by Meera R.',
    },
    {
      timestamp: "Aug 5, 01:10 PM",
      action: 'Project "Wellness App Redesign" In Progress.',
    },
    {
      timestamp: "Aug 5, 01:10 PM",
      action: 'Project "Wellness App Redesign" In Progress.',
    },
    {
      timestamp: "Aug 5, 01:10 PM",
      action: 'Project "Wellness App Redesign" In Progress.',
    },
    {
      timestamp: "Aug 5, 01:10 PM",
      action: 'Project "Wellness App Redesign" In Progress.',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Metric Cards - Responsive Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        {" "}
        <MetricCard
          title="Total Earnings:"
          //growth={23}
          value={`$${totalEarnings}`}
          desc="Month"
        />
        <MetricCard
          title="To Be Paid:"
          //growth={23}
          value={`$${toBePaid}`}
          desc="to Team"
        />
        <MetricCard
          title="Revenue:"
          //growth={23}
          value={`$${revenue}`}
          desc="This Month"
        />
        <MetricCard
          title="Business Expenses:"
          //growth={23}
          value={`$${revenue * (80 / 100)}`}
          desc="This Month"
        />
        <MetricCard
          title="Owner’s Pay:"
          //growth={23}
          value={`$${revenue * (10 / 100)}`}
          desc="This Month"
        />
        <MetricCard
          title="Taxes:"
          //growth={23}
          value={`$${revenue * (5 / 100)}`}
          desc="This Month"
        />
        <MetricCard
          title="Growth Fund:"
          //growth={23}
          value={`$${revenue * (5 / 100)}`}
          desc="This Month"
        />
        <MetricCard
          title="Active Members:"
          // //growth={23}
          value={totalActiveFreelancers}
          desc="Engaged Members"
        />
      </div>

      {/* Charts Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Chart 1 - This Month's Revenue */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="This Month’s Revenue"
              keyValue={`$${revenue}`}
              secondaryLabel="+12% vs last month"
            />
            {/* <ToggleTabs
                     options={["Month", "Project Based"]}
                     defaultValue="Month"
                     onChange={(val) => console.log("Selected:", val)}
                   /> */}
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueChart}
                margin={{ top: 20, right: 10, bottom: 20 }}
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
                  formatter={(value, _name, entry) => [
                    `${value.toLocaleString()} USD`, // value formatting
                    entry.payload.key, // label from data
                  ]}
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
                <Bar dataKey="value" barSize={60} radius={[4, 4, 4, 4]}>
                  {revenueChart.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={revenueColor[entry.key]}
                      cursor="none"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {revenueChart.map((item) => {
              const total = revenueChart.reduce((sum, d) => sum + d.value, 0);
              const percentage = ((item.value / total) * 100).toFixed(0);
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
                    {item.key}: {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2 - Amount Owed */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Team Payment:"
              keyValue={`$${TeamPayment[0]?.value + TeamPayment[1]?.value}`}
              secondaryLabel="To team"
            />
            {/* <div className="flex gap-2 flex-wrap">
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
            </div> */}
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TeamPayment}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%"
                  paddingAngle={0}
                  label={({ key, value }) => `${key} $${value}`}
                >
                  {TeamPayment?.map((entry, index) => (
                    <Cell key={index} fill={paymentColor[entry.key]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value}`, upFirst(name)]}
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {TeamPayment.map((item) => {
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: paymentColor[item.key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">
                    {upFirst(item.key)}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3 - Active Tasks */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Tasks:"
              keyValue={taskData?.summary[taskPill]}
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

        {/* Chart 4 - Deadline Counts */}
        <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Deadlines"
              keyValue={totalDeadline}
              secondaryLabel={`Project Deadlines this ${deadlinePill}`}
            />
            <div className="flex gap-2 flex-wrap">
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Week"
                onChange={(val) => setDeadlinePill(val.toLowerCase())}
              />
            </div>
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
                <Bar
                  dataKey="DeadlineCount"
                  fill="#A88AED"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-around">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]"></div>
              <span className="typo-b3 text-white text-xs md:text-sm">
                Deadline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section - Responsive */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-[1.4fr_1.1fr] gap-4">
        {/* Assigned Team Members Table */}
        <div className="bg-surface2 border-2 border-divider rounded-lg p-3 md:p-4 pb-2">
          <div className="flex justify-between mb-4 typo-b2 text-text">
            <div>Assigned Team Members</div>
            <div className="text-text2 cursor-pointer hover:text-text">
              see all
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-0">
              <thead className="table-header-group after:content-[''] after:block after:h-1">
                <tr className="text-left">
                  <th className="typo-b3 text-text2 px-2 md:px-4 text-xs md:text-sm">
                    Client
                  </th>
                  <th className="typo-b3 text-text2 px-2 md:px-4 text-xs md:text-sm">
                    Project
                  </th>
                  <th className="typo-b3 text-text2 px-2 md:px-4 text-xs md:text-sm">
                    Team Member
                  </th>
                  <th className="typo-b3 text-text2 px-2 md:px-4 text-xs md:text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className="h-12 md:h-14 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                  >
                    {/* Client */}
                    <td className="py-2 px-2 md:px-4 first:rounded-l-[4px] bg-divider">
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/profile.png"
                          alt="client"
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                        />
                        <span className="typo-b2 text-text text-xs md:text-sm truncate max-w-[300px]">
                          {project.client}
                        </span>
                      </div>
                    </td>
                    {/* Project */}
                    <td className="typo-b2 text-text py-2 px-2 md:px-4 bg-divider text-xs md:text-sm">
                      <span className="truncate block max-w-[250px]">
                        {project.project}
                      </span>
                    </td>
                    {/* Team Member - Hidden on mobile */}
                    <td className="py-2 px-2 md:px-4 bg-divider">
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/profile.png"
                          alt="assigned"
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                        />
                        <span className="typo-b2 text-text text-xs md:text-sm truncate max-w-[200px]">
                          {project.teamMembers}
                        </span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="py-2 px-2 md:px-4 bg-divider last:rounded-r-[4px]">
                      <span className="py-1 typo-b3 text-xs md:text-sm">
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 pb-2">
          <div className="flex justify-between mb-4 typo-b2 text-text">
            <div>Recent Activity Log</div>
            <div className="text-text2 cursor-pointer hover:text-text">
              see all
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-0">
              <thead className="hidden after:content-[''] after:block after:h-1">
                <tr className="text-left">
                  <th className="typo-b3 text-text2 px-4">Time</th>
                  <th className="typo-b3 text-text2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr
                    key={index}
                    className="h-auto md:h-15 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                  >
                    <td className="typo-b2 text-text py-2 px-2 md:px-4 bg-divider first:rounded-l-[4px] text-xs md:text-sm whitespace-nowrap">
                      {activity.timestamp}
                    </td>
                    <td className="py-2 px-2 md:px-4 bg-divider last:rounded-r-[4px]">
                      <span className="typo-b2 text-text2 text-xs md:text-sm block">
                        {activity.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
