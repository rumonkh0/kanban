import { Table, Th, Thead, Td, ImageName } from "@/components/Component";
import Modal from "@/components/Modal";
import DropdownMenu from "@/components/DropdownMenu";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Link } from "react-router";
import ServiceDetailsModal from "../../components/ServiceDetailsModal";
import { useDeleteService, useServices } from "../../hooks/useService";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
function ServiceDetails() {
  const [ServiceModal, setServiceModal] = useState(false);

  const { data: services, isLoading, isError } = useServices();
  const deleteClientMutation = useDeleteService();
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClientMutation.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete client");
        },
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading clients</div>;
  }

  return (
    <>
      {console.log("from services", services)}
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
        {/* <div className="flex py-1 gap-4">
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
        </div> */}
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
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td className="irst:rounded-l-[4px] min-w-45">
                  {service.serviceName}
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
                  <Members members={service.freelancers} />
                </Td>
                <Td>{service.addons ? service.addons : "------"}</Td>
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
                          onClick: () => setServiceModal(true),
                        },
                        {
                          label: "Edit",
                          href: `/services/services/${service._id}/edit`,
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDelete(service._id),
                        },
                      ]}
                    />
                  </button>
                </Td>
              </tr>
            ))
          ) : (
            <div className="text-center">No services</div>
          )}
        </tbody>
      </Table>
      <Modal isOpen={ServiceModal} onClose={() => setServiceModal(false)}>
        <ServiceDetailsModal onClose={() => setServiceModal(false)} />
      </Modal>
    </>
  );
}

function Members({ members }) {
  if (!members || members.length === 0) return "-------";

  // ✅ Only 1 member → avatar + name
  if (members.length === 1) {
    const m = members[0];
    const memberImage = m?.profilePicture?.filePath
      ? `${baseURL}/${m.profilePicture.filePath}`
      : "/images/profile.png";
    return <ImageName image={memberImage} username={m.name} />;
  }

  return (
    <div className="flex -space-x-3">
      {members.slice(0, 5).map((m, idx) => {
        const memberImage = m?.profilePicture?.filePath
          ? `${baseURL}/${m.profilePicture.filePath}`
          : "/images/profile.png";

        return (
          <img
            key={idx}
            src={memberImage}
            alt={m?.name || `member ${idx}`}
            title={m?.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
        );
      })}
      {members.length > 5 && (
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-xs text-gray-700 border-2 border-white">
          +{members.length - 5}
        </span>
      )}
    </div>
  );
}

export default ServiceDetails;
