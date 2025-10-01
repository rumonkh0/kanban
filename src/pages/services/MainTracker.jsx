import { Table, Th, Thead, Td, ImageName } from "@/components/Component";
import Modal from "@/components/Modal";

import DropdownMenu from "@/components/DropdownMenu";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Link } from "react-router";
import TrackerDetailsModal from "../../components/TrackerDetailsModal";
import { FilterDropdown, RedButton } from "../../components/Component";

function MainTracker() {
  const [trackerModal, setTrackerModal] = useState(false);
  const tableHeadings = [
    "Company Name",
    "Client",
    "Team Member Assigned",
    "Project Name",
    "Description",
    "Start",
    "Due Date",
    "Status",
    "Price",
    "Custom Price",
    "Discount",
    "Final Amount For Client",
    "Mode of Payment",
    "Payment Date",
    "Amount Paid",
    "Amount Owed by Client",
    "Payable Amount To Member",
    "Due Paid To Member",
    "Amount Paid To Member",
    "Amount Owed To Member",
    "Amount Earned",
    "Amount Claimed",
    "Action",
  ];
  const trackers = [
    {
      CompanyName: "TechCorp Ltd",
      Client: "John Doe",
      TeamMemberAssigned: "Akash",
      ProjectName: "Website Redesign",
      Description:
        "Complete redesign of company website Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor?",
      Start: "2025-07-10",
      DueDate: "2025-08-15",
      Status: "In Progress",
      Price: 1500,
      CustomPrice: 1400,
      Discount: 100,
      FinalAmountForClient: 1400,
      ModeOfPayment: "Stripe",
      PaymentDate: "2025-08-05",
      AmountPaid: 1000,
      AmountOwedByClient: 400,
      PayableAmountToMember: 1000,
      DatePaidToMember: 500,
      AmountPaidToMember: 500,
      AmountOwedToMember: 500,
      AmountEarned: 900,
      AmountClaimed: 0,
    },
    {
      CompanyName: "Creative Studio",
      Client: "Jane Smith",
      TeamMemberAssigned: "Rahul",
      ProjectName: "Social Media Campaign",
      Description: "3-month Instagram and Facebook ad campaign",
      Start: "2025-06-01",
      DueDate: "2025-09-01",
      Status: "Completed",
      Price: 2000,
      CustomPrice: 2000,
      Discount: 0,
      FinalAmountForClient: 2000,
      ModeOfPayment: "Bank Transfer",
      PaymentDate: "2025-08-20",
      AmountPaid: 2000,
      AmountOwedByClient: 0,
      PayableAmountToMember: 1200,
      DatePaidToMember: 1200,
      AmountPaidToMember: 1200,
      AmountOwedToMember: 0,
      AmountEarned: 800,
      AmountClaimed: 800,
    },
  ];
  const [filters, setFilters] = useState({
    status: "",
    project: "", // Added project filter for consistency
    client: "", // Added client filter for consistency
  });

  // Filter Configurations array, aligned with the Payment component structure
  const filterConfigs = [
    {
      key: "status",
      label: "Status",
      options: ["complete", "incomplete", "Owed"],
    },
    {
      key: "project",
      label: "Select Project",
      options: ["Project A", "Project B", "Project C"], // Placeholder options
    },
    {
      key: "client",
      label: "Select Client",
      options: ["Client X", "Client Y", "Client Z"], // Placeholder options
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <>
      <PageTitle title="Trackers" />
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-2 lg:gap-0">
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          <Link
            to={`/services/add-tracker`}
            className="bg-brand rounded-sm flex items-center flex-1 lg:flex-none  justify-center"
          >
            <RedButton>
              <div className="w-6 h-6 flex justify-center items-center">
                <Icon name="plus" size={15} />
              </div>
              Add Tracker
            </RedButton>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 lg:gap-4">
          {filterConfigs.map(({ key, label, options }) => (
            <FilterDropdown
              key={key}
              label={label}
              options={options}
              value={filters[key]}
              onSelect={(value) => handleFilterChange(key, value)}
              className="h-8 w-full sm:w-auto"
            />
          ))}
        </div>
      </div>

      <Table>
        <Thead>
          <tr>
            {tableHeadings.map((heading, index) => (
              <Th key={index} title={heading} />
            ))}
          </tr>
        </Thead>
        <tbody>
          {trackers.map((tracker, index) => (
            <tr
              onClick={() => setTrackerModal(true)}
              key={index}
              className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors cursor-pointer"
            >
              <Td className="irst:rounded-l-[4px] min-w-45">
                {tracker.CompanyName}
              </Td>
              <Td className="min-w-45">
                <ImageName
                  image="/images/profile.png"
                  username={tracker.Client}
                  designation={tracker.Client}
                />
              </Td>
              <Td className="min-w-45">
                <ImageName
                  image="/images/profile.png"
                  username={tracker.TeamMemberAssigned}
                  designation={tracker.TeamMemberAssigned}
                />
              </Td>
              <Td className="min-w-45">{tracker.ProjectName}</Td>
              <Td className="min-w-60">
                <div className="line-clamp-2">{tracker.Description}</div>
              </Td>
              <Td>{tracker.Start}</Td>
              <Td>{tracker.DueDate}</Td>
              <Td>
                <div className="w-30 border border-text2 rounded-sm flex items-center p-3 gap-2 typo-b3">
                  <p className="w-2 h-2 bg-success rounded-full"></p>
                  {tracker.Status}
                </div>
              </Td>
              <Td>${tracker.Price}</Td>
              <Td>
                {tracker.CustomPrice ? `$${tracker.CustomPrice}` : "------"}
              </Td>
              <Td>{tracker.Discount ? `$${tracker.Discount}` : "------"}</Td>
              <Td>
                {tracker.FinalAmountForClient
                  ? `$${tracker.FinalAmountForClient}`
                  : "------"}
              </Td>
              <Td>{tracker.ModeOfPayment}</Td>
              <Td>{tracker.PaymentDate}</Td>
              <Td>
                {tracker.AmountPaid ? `$${tracker.AmountPaid}` : "------"}
              </Td>
              <Td>
                {tracker.AmountOwedByClient
                  ? `$${tracker.AmountOwedByClient}`
                  : "------"}
              </Td>
              <Td>
                {tracker.PayableAmountToMember
                  ? `$${tracker.PayableAmountToMember}`
                  : "------"}
              </Td>
              <Td>{tracker.DatePaidToMember}</Td>
              <Td>
                {tracker.AmountPaidToMember
                  ? `$${tracker.AmountPaidToMember}`
                  : "------"}
              </Td>
              <Td>
                {tracker.AmountOwedToMember
                  ? `$${tracker.AmountOwedToMember}`
                  : "------"}
              </Td>
              <Td>
                {tracker.AmountEarned ? `$${tracker.AmountEarned}` : "------"}
              </Td>
              <Td>
                {tracker.AmountClaimed ? `$${tracker.AmountClaimed}` : "------"}
              </Td>

              <Td className="last:rounded-r-[4px]">
                <button
                  onClick={(e) => handleMenuClick(index, e)}
                  className="relative p-2 cursor-pointer hover:bg-surface2/60 border border-text2 rounded-sm"
                >
                  <Icon name="menu" size={20} />
                  <DropdownMenu
                    isOpen={activeMenu === index}
                    onClose={() => setActiveMenu(null)}
                    menuItems={[
                      {
                        label: "Edit",
                        href: "/services/edit-tracker",
                      },
                    ]}
                  />
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={trackerModal} onClose={() => setTrackerModal(false)}>
        <TrackerDetailsModal onClose={() => setTrackerModal(false)} />
      </Modal>
    </>
  );
}

export default MainTracker;
