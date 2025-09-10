import { Table, Th, Thead, Td, ImageName } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Link } from "react-router";

function ServiceDetails() {
  const services = [
    {
      service: "Social Media Page",
      description: "Setup for 2 social media accounts (e.g., Facebook & ...)",
      clientsPay: "$78.00",
      teamsPayment: "$14.00",
      teamMember: {
        name: "Akash",
        role: "Marketing Head",
      },
      addons: "",
    },
    {
      service: "Social Media Page",
      description: "Setup for 3 social media accounts (e.g., Facebook, In...)",
      clientsPay: "$128.00",
      teamsPayment: "$25.00",
      teamMember: {
        name: "Akash",
        role: "Marketing Head",
      },
      addons: "",
    },
    {
      service: "Social Media Page",
      description: "Setup for 4+ social media accounts (Facebook, Instag....)",
      clientsPay: "$198.00",
      teamsPayment: "$45.00",
      teamMember: {
        name: "Akash",
        role: "Marketing Head",
      },
      addons: "",
    },
  ];
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <>
      <PageTitle title="Services" />
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/services/add-service"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Service
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select match</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select Client</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <Table>
        <Thead>
          <tr>
            <Th title="Service" />
            <Th title="Description" />
            <Th title="Clients Pay" />
            <Th title="Team's Payment" />
            <Th title="Team Member" />
            <Th title="Addons" />
            <Th title="Action" />
          </tr>
        </Thead>
        <tbody>
          {services.map((service, index) => (
            <tr
              key={index}
              className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
            >
              <Td className="irst:rounded-l-[4px] min-w-45">
                {service.service}
              </Td>
              <Td className="min-w-65">
                <div className="line-clamp-2">{service.description}</div>
              </Td>

              <Td>
                {service.clientsPay ? `$${service.clientsPay}` : "------"}
              </Td>
              <Td>
                {service.teamsPayment ? `$${service.teamsPayment}` : "------"}
              </Td>
              <Td className="min-w-45">
                <ImageName
                  image="/images/profile.png"
                  username={service.teamMember.name}
                  designation={service.teamMember.role}
                />
              </Td>
              <Td>
                {service.FinalAmountForClient
                  ? `$${service.FinalAmountForClient}`
                  : "------"}
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
                        label: "View",
                        href: "/services/edit-service",
                      },
                      {
                        label: "Edit",
                        href: "/services/edit-service",
                      },
                      {
                        label: "Delete",
                        href: "/services/edit-service",
                      },
                    ]}
                  />
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ServiceDetails;
