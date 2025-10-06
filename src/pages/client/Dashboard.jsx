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
import {
  useClientProjectPayment,
  useClientProjectStatusPie,
  useClientSpecificStat,
} from "../../hooks/useDashboard";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
function Dashboard() {
  const [projectPill, setProjectPill] = useState("week");
  const clientId = useAuthStore((state) => state.user.user._id);
  const { data: stats } = useClientSpecificStat(clientId);
  const {
    totalProjects = 0,
    activeProjects = 0,
    completedProjects = 0,
    dueProjects = 0,
    totalPayment = 0,
    paid = 0,
    owed = 0,
  } = stats || {};

  const { data: projectData } = useClientProjectStatusPie(clientId);
  const prdata = projectData?.[projectPill] || [];
  const projects = prdata.filter((item) => item.key !== "total");
  const projectsColor = {
    completed: "#8FC951",
    active: "#5EB7E0",
    due: "#FEEF4D",
    overdue: "#FE4E4D",
  };
  const { data: earningsData = [] } = useClientProjectPayment(clientId);
  const earningColor = {
    "Total Payment": "#8FC951",
    Owed: "#A88AED",
    Paid: "#5EB7E0",
  };
 
  console.log(projects);
  return (
    <>
      <PageTitle title="Client Dashboard" />
      <div className="flex flex-col gap-4">
        {/* <div className="flex gap-2 flex-wrap"> */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
          <MetricCard
            title="Total Project:"
            value={totalProjects}
            desc="Month"
          />
          <MetricCard
            title="Acrive Project:"
            growth={23}
            value={activeProjects}
            desc="Month"
          />
          <MetricCard
            title="Complete Project:"
            growth={23}
            value={completedProjects}
            desc="Month"
          />
          <MetricCard
            title="Due Project:"
            growth={23}
            value={dueProjects}
            desc="Month"
          />
          <MetricCard
            title="Total Payment"
            growth={23}
            value={`$${totalPayment}`}
            desc="Total"
          />
          <MetricCard title="Paid:" growth={23} value={`$${paid}`} />
          <MetricCard title="Owed:" value={`$${owed}`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* projects */}
          <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <ChartHeader
                primaryLabel="Total Project"
                keyValue={prdata[0]?.value}
              />
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Month"
                onChange={(val) => setProjectPill(val.toLowerCase())}
              />
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projects}
                    dataKey="value"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    stroke="none"
                    outerRadius="90%" // responsive size
                    paddingAngle={0}
                    label={({ key, value }) => `${key} ${value}`}
                  >
                    {projects.map((entry, index) => (
                      <Cell key={index} fill={projectsColor[entry.key]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}`}
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
              {projects.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: projectsColor[item.key] }}
                  ></div>
                  <span className="typo-b3 text-xs md:text-sm">{item.key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* payment */}
          <div className="w-full h-[494px] md:h-[594px] lg:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <ChartHeader
                primaryLabel="Total Payment"
                keyValue={earningsData[0]?.["Total Payment"] || 0}
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
                    contentStyle={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                    }}
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
                    <span className="typo-b3 text-xs md:text-sm">
                      {item.key}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
