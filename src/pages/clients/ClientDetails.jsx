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

function ClientDetails() {
  const client = {
    salutation: "Mrs.",
    fullName: "Gustave Koelpin",
    email: "catityn66@example.net7",
    country: "USA",
    mobile: "+0954820528",
    gender: "Female",
    language: "English",
    clientCategory: "Design",
    dateOfBirth: "Aug 27, 1990",
    status: "Active",
    companyName: "@example",
    officialWebsite: "example.com",
    taxName: "GST",
    gstVatNumber: "E2A456987",
    officePhoneNumber: "+56987412.3",
    city: "New York",
    state: "USA",
    postalCode: "568742",
    addedBy: "Admin",
    companyAddress: "I32, My Street, Kingston, New York 12401",
    shippingAddress: "I32, My Street, Kingston, New York 12401",
    paymentMethod: "Zelle, Venmo",
  };
  const data = [
    { name: "Complete", sales: 2, color: "#8FC951" },
    { name: "In Progress", sales: 1, color: "#5EB7E0" },
    { name: "On Hold", sales: 1, color: "#A88AED" },
    { name: "Cancelled", sales: 1, color: "#FE4E4D" },
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
          name="creativezethdesign"
          designation="Admin"
          active={true}
          className="relative"
        >
          <Link to="/clients/id/edit">
            <Icon name="edit" className="absolute right-4 top-4" />
          </Link>
        </PersonCard>
        <MetricCard title="Total Projects:" growth={12} value={5} />
        <MetricCard title="Total Earnings:" growth={12} value="$160" />
        <MetricCard title="Due Payments:" growth={-22} value="$60" />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-span-2 border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          <h2 className="typo-b1">Profile Info</h2>
          <div className="flex flex-col gap-4">
            <InfoItem label="Salutation" value={client.salutation} />
            <InfoItem label="Full Name" value={client.fullName} />
            <InfoItem label="Email" value={client.email} />
            <InfoItem label="Country" value={client.country} />
            <InfoItem label="Mobile" value={client.mobile} />
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
            <InfoItem label="Payment Method" value={client.paymentMethod} />
          </div>
          <div className="flex justify-between">
            <RedBorderButton>Edit</RedBorderButton>
            <RedButton>Share</RedButton>
          </div>
        </div>
        <div className="w-full h-[468px] border-2 border-divider bg-surface2 rounded-lg p-4 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between">
            <ChartHeader primaryLabel="Total Projects:" keyValue="4" />
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
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
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
                  contentStyle={{ backgroundColor: "#F3F4F6", borderRadius: 8 }}
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
  );
}

const InfoItem = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="typo-b2 text-text2 w-[200px]">{label}</span>
    <span className="typo-b2">: &nbsp; {value}</span>
  </div>
);

export default ClientDetails;
