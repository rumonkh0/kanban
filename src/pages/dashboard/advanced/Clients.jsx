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
import ClientTable from "@/pages/clients/ClientTable";
import { Link } from "react-router";
import { FilterDropdown, ToggleTabs } from "../../../components/Component";
import {
  useClientPayment,
  useClientProject,
  useClientStat,
} from "../../../hooks/dashboard";
import { useState } from "react";
function AdminClientDashboard() {
  const [projectPill, setProjectPill] = useState("week");
  const { data: clientStat } = useClientStat();
  const { data: clientPaymentStat } = useClientPayment();
  const clientsPay = [
    { key: "Paid", value: clientPaymentStat?.totalPaidByClient || 0 },
    { key: "Owed", value: clientPaymentStat?.totalOwedByClient || 0 },
  ];
  const paymentColor = {
    Paid: "#8FC951",
    Owed: "#FE4E4D",
  };
  const { data: clientProjectData } = useClientProject();
  const clientProject = clientProjectData && clientProjectData[projectPill];

  console.log(clientProject);

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <MetricCard
          title="Total Clients:"
          growth={clientStat?.totalClients || 0}
          value={clientStat?.totalClients || 0}
          desc="Clients"
        />
        <MetricCard
          title="Active Clients:"
          growth={clientStat?.totalActiveClients || 0}
          value={clientStat?.totalActiveClients || 0}
          desc=" Engaged Clients"
        />
        <MetricCard
          title="Inactive Clients:"
          growth={clientStat?.totalInactiveClients || 0}
          value={clientStat?.totalInactiveClients || 0}
          desc="Clients"
        />
        <MetricCard
          title="Average Projects:"
          growth={clientStat?.avgProjectPerClient || 0}
          value={clientStat?.avgProjectPerClient || 0}
          desc="Per Clients"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* first */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Payment Owed"
              keyValue={`$${clientsPay[0].value}`}
              secondaryLabel="From Clients"
            />
            {/* <FilterDropdown
              label="Clients"
              options={["project one", "project two", "project three"]}
              className="h-7.5 border border-text2 "
            /> */}
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientsPay}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius="80%"
                  paddingAngle={0}
                  label={({ name, value }) => `${name} $${value}`}
                >
                  {clientsPay.map((entry, index) => (
                    <Cell key={index} fill={paymentColor[entry.key]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value}`}
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {clientsPay.map((item) => {
              {/* const total = clientsPay.reduce((sum, d) => sum + d.value, 0);
              const percentage = ((item.value / total) * 100).toFixed(0); */}

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
                    {item.key}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          {/**/}
        </div>

        {/* second */}
        <div className="w-full h-[494px] md:h-[594px] border-2 border-divider bg-surface2 rounded-lg p-3 md:p-4 flex flex-col gap-4 md:gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <ChartHeader
              primaryLabel="Total Clients"
              keyValue="7"
              secondaryLabel=""
            />
            <div className="flex gap-2 flex-wrap">
              {/* <FilterDropdown
                label="Select Client"
                options={["project one", "project two", "project three"]}
                className="h-7.5 border border-text2 "
              /> */}
              <ToggleTabs
                options={["Week", "Month", "Year"]}
                defaultValue="Week"
                onChange={(val) => setProjectPill(val.toLowerCase())}
              />
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientProject}
                barCategoryGap="20%"
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
          <div className="C() flex justify-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5EB7E0]"></div>
              <span className="typo-b3 text-xs md:text-sm">Active</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8FC951]"></div>
              <span className="typo-b3 text-xs md:text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FE4E4D]"></div>
              <span className="typo-b3 text-xs md:text-sm">Due</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h2 className="typo-b1">Clients</h2>
          <Link to="#" className="typo-cta text-text2">
            See All
          </Link>
        </div>
        <ClientTable />
      </div>
    </div>
  );
}

export default AdminClientDashboard;
