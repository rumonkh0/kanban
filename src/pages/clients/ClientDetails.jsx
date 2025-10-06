import { RedBorderButton, RedButton, Icon } from "@/components/Component";
import MetricCard from "@/components/MetricCard";
import PersonCard from "@/components/PersonCard";
import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { ChartHeader } from "@/components/Component";
import { Link, useParams } from "react-router";
import { Edit } from "../../components/Icon";
import { useClientDetails } from "../../hooks/useClients";

function ClientDetails() {
  const { id } = useParams();

  const { data: client, isLoading } = useClientDetails(id);
  const statusColors = {
    Completed: "#8FC951",
    Active: "#5EB7E0",
    "On Hold": "#A88AED",
  };

  const data = [
    { key: "Completed", value: 2 },
    { key: "Active", value: 1 },
    { key: "On Hold", value: 1 },
  ];
  const paymentColor = {
    "Total Paid": "#8FC951",
    "Total Due": "#FE4E4D",
  };

  if (isLoading) return <div>Client Data Loading</div>;
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex gap-2 flex-wrap"> */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(293px,1fr))] gap-2">
        <PersonCard
          image={client.profilePicture}
          name={client.name}
          designation={client.role}
          // active={true}
          lastLogin={client.user.lastLogin}
          className="relative"
        >
          <Link to={`/clients/${id}/edit`} className="absolute right-4 top-4 ">
            <Edit />
          </Link>
        </PersonCard>
        <MetricCard
          title="Total Projects:"
          // growth={12}
          value={client.totalProjects}
        />
        <MetricCard
          title="Total Earnings:"
          // growth={12}
          value={`$${client.totalEarnings}`}
        />
        <MetricCard
          title="Due Payments:"
          // growth={-22}
          value={`$${client.totalDue}`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2 border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          <h2 className="typo-b1">Profile Info</h2>
          <div className="flex flex-col gap-4">
            <InfoItem label="Salutation" value={client.salutation} />
            <InfoItem label="Full Name" value={client.name} />
            <InfoItem label="Email" value={client.email} />
            <InfoItem label="Country" value={client.country} />
            <InfoItem
              label="Mobile"
              value={`${client.mobile?.countryCode}${client.mobile?.number}`}
            />
            <InfoItem label="Gender" value={client.gender} />
            <InfoItem label="Language" value={client.language} />
            <InfoItem label="Client Category" value={client.clientCategory} />
            <InfoItem label="Date of Birth" value={client.dateOfBirth} />
            <InfoItem label="Status" value={client.status} />
            <InfoItem label="Company Name" value={client.companyName} />
            <InfoItem label="Official Website" value={client.officialWebsite} />
            <InfoItem label="Tax Name" value={client.taxName} />
            <InfoItem label="GST/VAT Number" value={client.gstVatNumber} />
            <InfoItem
              label="Office Phone Number"
              value={client.officePhoneNumber}
            />
            <InfoItem label="City" value={client.city} />
            <InfoItem label="State" value={client.state} />
            <InfoItem label="Postal code" value={client.postalCode} />
            <InfoItem label="Added By" value={client.addedBy} />
            <InfoItem label="Company Address" value={client.companyAddress} />
            <InfoItem label="Shipping Address" value={client.shippingAddress} />
            <InfoItem
              label="Payment Methods"
              value={client.paymentMethods?.join(", ")}
            />
          </div>
          <div className="flex justify-between">
            <Link to={`/clients/${client._id}/edit`}>
              <RedBorderButton>Edit</RedBorderButton>
            </Link>
            <RedButton>Share</RedButton>
          </div>
        </div>
        <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Total Projects:"
              keyValue={client.totalProjects}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={client?.statusCounts || []}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius={150}
                  paddingAngle={0}
                  // labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={statusColors[entry.key]} />
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
          <div className="flex justify-center gap-4 flex-wrap">
            {client.statusCounts.map((item) => {
              return (
                <div key={item.key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColors[item.key] }}
                  ></div>
                  <span className="typo-b3">
                    {item.key}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader
              primaryLabel="Total Earnings:"
              keyValue={`$${
                client.paymentStatus[0].value + client.paymentStatus[1].value
              }`}
            />
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={client?.paymentStatus}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  stroke="none"
                  outerRadius={150}
                  paddingAngle={0}
                  label={({ key, value }) => `${key} : $${value}`}
                  // labelLine={false}
                >
                  {/* {console.log(paymentColor[client.paymentStatus[0].key])} */}
                  {client?.paymentStatus.map((entry, index) => (
                    <Cell key={index} fill={paymentColor[entry.key]} />
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
          <div className="flex justify-center gap-4 flex-wrap">
            {client?.paymentStatus.map((item) => {
              return (
                <div key={item.key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: paymentColor[item.key] }}
                  ></div>
                  <span className="typo-b3">
                    {item.key}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
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

export default ClientDetails;
