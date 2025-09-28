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

function Overview() {
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
  const data = [
    { name: "Expenses", sales: 4000, color: "#FE4E4D" },
    { name: "Owner's pay", sales: 500, color: "#8FC951" },
    { name: "Taxes", sales: 250, color: "#A88AED" },
    { name: "Growth Fund", sales: 250, color: "#5EB7E0" },
  ];
  const weekdata = [
    { Key: "Mon", Active: 5, Completed: 2, Due: 1 },
    { Key: "Tue", Active: 3, Completed: 4, Due: 2 },
    { Key: "Wed", Active: 4, Completed: 3, Due: 3 },
    { Key: "Thu", Active: 6, Completed: 5, Due: 0 },
    { Key: "Fri", Active: 2, Completed: 6, Due: 1 },
    { Key: "Sat", Active: 1, Completed: 3, Due: 2 },
    { Key: "Sun", Active: 0, Completed: 2, Due: 4 },
  ];
  const deadlineData = [
    { Day: "Mon", DeadlineCount: 5 },
    { Day: "Tue", DeadlineCount: 3 },
    { Day: "Wed", DeadlineCount: 4 },
    { Day: "Thu", DeadlineCount: 6 },
    { Day: "Fri", DeadlineCount: 2 },
    { Day: "Sat", DeadlineCount: 1 },
    { Day: "Sun", DeadlineCount: 0 },
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
        <MetricCard
          title="Active Members:"
          growth={23}
          value="22"
          desc="Engaged Members"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
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
              options={["Month", "Project based"]}
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
              primaryLabel="Amount Owed"
              keyValue="$5,400"
              secondaryLabel="To team"
            />
            <div className="flex gap-4">
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
        {/* third */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Active Tasks"
              keyValue="7"
              secondaryLabel="Today"
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdata} barCategoryGap="20%">
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
        {/* fourth */}
        <div className="w-full h-[594px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="DeadlineCounts"
              keyValue="4"
              secondaryLabel="Project Deadlines Today"
            />
            <ToggleTabs
              options={["Week", "Month", "Year"]}
              defaultValue="Week"
              onChange={(val) => console.log("Selected:", val)}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadlineData} barCategoryGap="30%">
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
                  formatter={(value) => `${value} deadlines`}
                  contentStyle={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 8,
                    border: "none",
                  }}
                />
                <Bar dataKey="DeadlineCount" fill="#A88AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A88AED]"></div>
              <span className="typo-b3 text-white">Deadline</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid min-[1440px]:grid-cols-[1.4fr_1.1fr] grid-cols-1 gap-4">
        {/* Left */}
        <div className="bg-surface2 border-2 border-divider rounded-lg p-4 pb-2">
          <div className="flex justify-between mb-4 typo-b2 text-text">
            <div>Assigned Team Members</div>
            <div className="text-text2">see all</div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-0">
              <thead className="table-header-group after:content-[''] after:block after:h-1">
                <tr className="text-left">
                  <th className="typo-b3 text-text2 px-4">Client</th>
                  <th className="typo-b3 text-text2 px-4">Project</th>
                  <th className="typo-b3 text-text2 px-4">Team Member</th>
                  <th className="typo-b3 text-text2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className="h-14 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                  >
                    {/* Client Name with Avatar */}
                    <td className="py-2 px-4 first:rounded-l-[4px] bg-divider">
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/profile.png"
                          alt="client"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="typo-b2 text-text">
                          {project.client}
                        </span>
                      </div>
                    </td>
                    <td className="typo-b2 text-text py-2 px-4 bg-divider">
                      {project.project}
                    </td>
                    {/* Assigned To with Avatar */}
                    <td className="py-2 px-4 bg-divider">
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/profile.png"
                          alt="assigned"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="typo-b2 text-text">
                          {project.teamMembers}
                        </span>
                      </div>
                    </td>
                    {/* Status Badge */}
                    <td className="py-2 px-4 bg-divider last:rounded-r-[4px]">
                      <span className={`py-1 typo-b3`}>{project.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-2 border-divider bg-surface2 rounded-lg p-4 pb-2">
          <div className="flex justify-between mb-4 typo-b2 text-text">
            <div>Recent Activity Log</div>
            <div className="text-text2">see all</div>
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
                    className="h-15 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                  >
                    <td className="typo-b2 text-text py-2 px-4 bg-divider first:rounded-l-[4px]">
                      {activity.timestamp}
                    </td>

                    <td className="py-2 px-4 bg-divider last:rounded-r-[4px]">
                      <span className={`typo-b2 text-text2`}>
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
