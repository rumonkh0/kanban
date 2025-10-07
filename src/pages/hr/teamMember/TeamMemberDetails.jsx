import { RedBorderButton, RedButton, Icon } from "@/components/Component";
import MetricCard from "@/components/MetricCard";
import PersonCard from "@/components/PersonCard";
import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { ChartHeader } from "@/components/Component";
import { Link } from "react-router";

function TeamMemberDetails() {
  const teamMember = {
    salutation: "Mrs.",
    fullName: "Prof. Toni Swift",
    email: "malinda.lowe@example.net2",
    userRole: "Team Member",
    department: "Designer",
    country: "USA",
    mobile: "+0954820528",
    gender: "Male",
    joiningDate: "Aug 12, 2024",
    birthDate: "Aug 12, 2003",
    language: "English",
    hourlyRate: "$10",
    slackMemberId: "2054820",
    skills: "UIUX Design",
    probationEndDate: "Sep 2, 2025",
    noticePeriodStartDate: "Aug 12, 2024",
    noticePeriodEndDate: "Sep 2, 2025",
    employmentType: "Full Time",
    maritalStatus: "Single",
    businessAddress: "Relatum",
    addedBy: "Admin",
    status: "Active",
    address: "132, My Street, Kingston, New York [240]",
  };
  const data = [
    { name: "Complete", sales: 2, color: "#8FC951" },
    { name: "Active", sales: 1, color: "#5EB7E0" },
    { name: "Due", sales: 1, color: "#A88AED" },
    { name: "Over Due", sales: 1, color: "#FE4E4D" },
  ];
  const earnings = [
    { name: "Paid", sales: 200, color: "#8FC951" },
    { name: "Pending", sales: 120, color: "#FE4E4D" },
  ];
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <PersonCard
          name="Prof. Toni Swift"
          designation="Tea member, Ui /UX designer"
          active={true}
          className="relative"
        >
          <Link to="/admin/hr/team-member/2/edit">
            <Icon name="edit" className="absolute right-4 top-4" />
          </Link>
        </PersonCard>
        <MetricCard title="Total Task:" growth={12} value={5} desc="Month" />
        <MetricCard title="Active Task:" growth={12} value="6" />
        <MetricCard title="Due Task:" value="8" />
        <MetricCard title="Overdue Task::" value="$60" />
        <MetricCard title="Amount Paid:" growth={22} value="$60" desc="Month" />
        <MetricCard title="Amount Owed:" growth={22} value="$60" desc="Month" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="row-span-2 border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          <h2 className="typo-b1">Profile Info</h2>
          <div className="flex flex-col gap-4">
            <InfoItem label="Salutation" value={teamMember.salutation} />
            <InfoItem label="Full Name" value={teamMember.fullName} />
            <InfoItem label="Email" value={teamMember.email} />
            <InfoItem label="User Role" value={teamMember.userRole} />
            <InfoItem label="Department" value={teamMember.department} />
            <InfoItem label="Country" value={teamMember.country} />
            <InfoItem label="Mobile" value={teamMember.mobile} />
            <InfoItem label="Gender" value={teamMember.gender} />
            <InfoItem label="Joining Date" value={teamMember.joiningDate} />
            <InfoItem label="Birth Date" value={teamMember.birthDate} />
            <InfoItem label="Language" value={teamMember.language} />
            <InfoItem label="Hourly Rate" value={teamMember.hourlyRate} />
            <InfoItem
              label="Slack Member ID"
              value={teamMember.slackMemberId}
            />
            <InfoItem label="Skills" value={teamMember.skills} />
            <InfoItem
              label="Probation End Date"
              value={teamMember.probationEndDate}
            />
            <InfoItem
              label="Notice Period Start Date"
              value={teamMember.noticePeriodStartDate}
            />
            <InfoItem
              label="Notice Period End Date"
              value={teamMember.noticePeriodEndDate}
            />
            <InfoItem
              label="Employment Type"
              value={teamMember.employmentType}
            />
            <InfoItem label="Marital Status" value={teamMember.maritalStatus} />
            <InfoItem
              label="Business Address"
              value={teamMember.businessAddress}
            />
            <InfoItem label="Added By" value={teamMember.addedBy} />
            <InfoItem label="Status" value={teamMember.status} />
            <InfoItem label="Address" value={teamMember.address} />
          </div>
          <div className="flex justify-between">
            <RedBorderButton>Edit</RedBorderButton>
            <RedButton>Share</RedButton>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between">
              <ChartHeader
                primaryLabel="Total Task:"
                keyValue="4"
                secondaryLabel="Month"
              />
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
                    outerRadius={150}
                    paddingAngle={0}
                    // labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
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
            <div className="flex justify-center gap-4 flex-wrap">
              {data.map((item) => {
                return (
                  <div key={item.name} className="flex items-center gap-2">
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
          <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between">
              <ChartHeader primaryLabel="Total Earnings:" keyValue="$400" />
              <div className="bg-divider h-[30px] flex items-center rounded-sm typo-b3 cursor-pointer text-text2">
                <div className="px-2 py-1.5 bg-brand rounded-sm text-white">
                  Week
                </div>
                <div className="px-2">Month</div>
                <div className="px-2">Year</div>
              </div>
            </div>

            {/* Chart */}
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={earnings}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    stroke="none"
                    outerRadius={150}
                    paddingAngle={0}
                    label={({ name, sales }) => `${name} : $${sales}`}
                    // labelLine={false}
                  >
                    {earnings.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
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
            <div className="flex justify-center gap-4 flex-wrap">
              {earnings.map((item) => {
                return (
                  <div key={item.name} className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="typo-b2 text-text2 w-[200px]">{label}</span>
    <span className="typo-b2">: &nbsp; {value}</span>
  </div>
);

export default TeamMemberDetails;
