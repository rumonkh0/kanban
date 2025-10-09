import { RedBorderButton, RedButton, Icon } from "@/components/Component";
import MetricCard from "@/components/MetricCard";
import PersonCard from "@/components/PersonCard";
import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { ChartHeader } from "@/components/Component";
import { Link, useParams } from "react-router";
import { useTeamMember, useTeamMemberstat } from "../../../hooks/useTeam";
import Loading from "../../../components/Loading";
import { FormatDate } from "../../../utils/utils";

function TeamMemberDetails() {
  const { id } = useParams();
  const { data: memberStat = {}, isPending: statPending } =
    useTeamMemberstat(id);
  const { data: memberData = {}, isPending: memberPending } = useTeamMember(id);
  console.log("this is member data", memberData);

  const data = [
    { name: "Complete", sales: memberStat.completedTasks, color: "#8FC951" },
    { name: "Active", sales: memberStat.activeTasks, color: "#5EB7E0" },
    // { name: "Due", sales:  memberStat.completedTasks, color: "#A88AED" },
    { name: "Over Due", sales: memberStat.overdueTasks, color: "#FE4E4D" },
  ];
  const earnings = [
    { name: "Paid", sales: memberStat.amountPaid, color: "#8FC951" },
    { name: "Pending", sales: memberStat.amountOwed, color: "#FE4E4D" },
  ];
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <PersonCard
          name={memberData?.name}
          designation={`Team member, ${memberData?.designation}`}
          image={memberData?.profilePicture}
          // active={true}
          lastLogin={memberData?.user?.lastLogin}
          className="relative"
        >
          <Link to={`/admin/hr/team-member/${memberData._id}/edit`}>
            <Icon name="edit" className="absolute right-4 top-4" />
          </Link>
        </PersonCard>
        <MetricCard
          title="Total Task:"
          value={memberStat.totalTasks}
          // desc="Month"
        />
        <MetricCard title="Active Task:" value={memberStat.activeTasks} />
        <MetricCard title="Due Task:" value={memberStat.dueTasks} />
        <MetricCard title="Overdue Task::" value={memberStat.overdueTasks} />
        <MetricCard
          title="Amount Paid:"
          value={`$${memberStat.amountPaid}`}
          // desc="Month"
        />
        <MetricCard
          title="Amount Owed:"
          value={`$${memberStat.amountOwed}`}
          // desc="Month"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="row-span-2 border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          <h2 className="typo-b1">Profile Info</h2>
          {memberPending ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-4">
              <InfoItem label="Salutation" value={memberData.salutation} />
              <InfoItem label="Full Name" value={memberData.name} />
              <InfoItem label="Email" value={memberData.user?.email} />
              <InfoItem label="User Role" value={memberData.designation} />
              <InfoItem
                label="Department"
                value={memberData.department.title}
              />
              <InfoItem label="Country" value={memberData.country} />
              <InfoItem
                label="Mobile"
                value={`${memberData.mobile?.countryCode}${memberData.mobile?.number}`}
              />
              <InfoItem label="Gender" value={memberData.gender} />
              <InfoItem
                label="Joining Date"
                value={FormatDate(memberData.joiningDate)}
              />
              <InfoItem
                label="Birth Date"
                value={FormatDate(memberData.birthDate)}
              />
              <InfoItem label="Language" value={memberData.language} />
              {/* <InfoItem label="Hourly Rate" value={memberData.hourlyRate} /> */}
              <InfoItem label="Slack Member ID" value={memberData.slackId} />
              <InfoItem label="Skills" value={memberData.skills} />
              <InfoItem
                label="Probation End Date"
                value={FormatDate(memberData.probationEndDate)}
              />
              <InfoItem
                label="Notice Period Start Date"
                value={FormatDate(memberData.noticePeriodStartDate)}
              />
              <InfoItem
                label="Notice Period End Date"
                value={FormatDate(memberData.noticePeriodEndDate)}
              />
              <InfoItem
                label="Employment Type"
                value={memberData.employmentType}
              />
              <InfoItem
                label="Marital Status"
                value={memberData.maritalStatus}
              />
              <InfoItem
                label="Business Address"
                value={memberData.businessAddress}
              />
              {/* <InfoItem label="Added By" value={memberData.addedBy} /> */}
              <InfoItem label="Status" value={memberData.status} />
              {/*     <InfoItem label="Address" value={memberData.address} /> */}
            </div>
          )}
          <div className="flex justify-between">
            <RedBorderButton>Edit</RedBorderButton>
            <RedButton>Share</RedButton>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {statPending ? (
            <Loading />
          ) : (
            <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between">
                <ChartHeader
                  primaryLabel="Total Task:"
                  keyValue={memberStat.totalTasks}
                  // secondaryLabel="Month"
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
          )}
          {statPending ? (
            <Loading />
          ) : (
            <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between">
                <ChartHeader
                  primaryLabel="Total Earnings:"
                  keyValue={`$${memberStat.amountPaid + memberStat.amountOwed}`}
                />
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
          )}
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value, text, children }) => (
  <div className="flex flex-col sm:flex-row items-start gap-0 sm:gap-2">
    <span className="typo-b2 text-text2 w-full sm:w-auto sm:min-w-[250px] font-semibold">
      {label}
    </span>
    <span className={`flex-1 flex items-start typo-b2 sm:mt-0 ${text || ""}`}>
      <span className="hidden sm:inline">: &nbsp;</span>
      <span className="sm:ml-0 mt-0.5">{value ?? children ?? "--------"}</span>
    </span>
  </div>
);

export default TeamMemberDetails;
