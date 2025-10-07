import { Link } from "react-router";
import Icon from "@/components/Icon";
import DropdownMenu from "@/components/DropdownMenu";
import { ImageName, Table, Td, Th, Thead } from "../../components/Component";
import { useState } from "react";
import { useClients } from "@/hooks/useClients";
import { useDeleteClient } from "../../hooks/useClients";
import moment from "moment/moment";
import Loading from "../../components/Loading";

function ClientTable({ filters }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const { data: clientsData, isLoading, isError } = useClients(filters);
  const deleteClientMutation = useDeleteClient();
  const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

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
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading clients</div>;
  }

  if (!clientsData || clientsData.length === 0)
    return <div className="text-center typo-h1">No Client Found</div>;
  return (
    <Table>
      <Thead>
        <tr className="text-left">
          <Th title="Client Name" />
          <Th title="Email" />
          <Th title="Project" />
          <Th title="Status" />
          <Th title="Assigned To" />
          <Th title="Last Update" />
          <Th title="Action" />
        </tr>
      </Thead>
      <tbody>
        {clientsData?.map((client, index) => {
          const imageUrl = client?.profilePicture?.filePath
            ? `${baseURL}/${client.profilePicture.filePath}`
            : "/images/profile.png";
          return (
            <tr
              key={index}
              className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
            >
              {/* Client Name with Avatar */}
              <Td className="first:rounded-l-[4px]">
                <Link to={`/admin/clients/${client.id}`}>
                  <ImageName image={imageUrl} username={client.name} />
                </Link>
              </Td>

              <Td data={client.email} />
              <Td data={client.project || "------"} />
              <Td>
                <div className={`text-xs typo-b3 flex items-center gap-2`}>
                  <p
                    className={`w-2 h-2 rounded-full ${
                      client.status === "Active" ? "bg-success" : "bg-brand"
                    }`}
                  ></p>
                  {client.status}
                </div>
              </Td>
              <Td>
                <ImageName image={client.image} username={client.assignedTo} />
              </Td>

              <Td
                data={
                  client.user.lastLogin
                    ? moment(client.user?.lastLogin).fromNow()
                    : "No Data"
                }
              />
              <Td className="text-left last:rounded-r-[4px]">
                <button
                  onClick={(e) => handleMenuClick(index, e)}
                  className="p-2 rounded-full cursor-pointer hover:bg-surface2/60 relative"
                >
                  <Icon name="menu" size={20} />
                  <DropdownMenu
                    isOpen={activeMenu === index}
                    onClose={() => setActiveMenu(null)}
                    menuItems={[
                      { label: "View", href: `/admin/clients/${client.id}` },
                      { label: "Edit", href: `/admin/clients/${client.id}/edit` },
                      {
                        label: "Delete",
                        onClick: () => handleDelete(client.id),
                      },
                    ]}
                  />
                </button>
              </Td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ClientTable;
