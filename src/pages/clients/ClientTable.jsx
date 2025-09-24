import { Link } from "react-router";
import Icon from "@/components/Icon";
import DropdownMenu from "@/components/DropdownMenu";
import { ImageName, Table, Td, Th, Thead } from "../../components/Component";
import { useState } from "react";
import { useClients } from "@/hooks/useClients";
import { useDeleteClient } from "../../hooks/useClients";

function ClientTable({ filters }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const { data: clientsData, isLoading, isError } = useClients(filters);
  const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const deleteClientMutation = useDeleteClient();

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

  // const clients = Array.isArray(clientsData) || [
  //   {
  //     clientName: "Gustave Koeipin",
  //     email: "caitlyn66@example.net7",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Prof. Toni Swift",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Brayan Gutkowski",
  //     email: "raul.dicki@example.com7",
  //     project: "Corporate Website Revamp",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Pasquale O'Connell",
  //     lastUpdate: "Aug 3, 2025",
  //   },
  //   {
  //     clientName: "Lavon Effertz",
  //     email: "eklocko@example.com2",
  //     project: "E-Commerce Platform",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Mrs. Angela Bechtelar Jr.",
  //     lastUpdate: "Jul 30, 2025",
  //   },
  //   {
  //     clientName: "Brycen Sipes",
  //     email: "rickey87@example.com8",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Celia Jast",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Randy Botsford Jr.",
  //     email: "abshire.keenan@example.net7",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Mrs. Yesenia Shields",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Miss Esmeralda Gerhold",
  //     email: "gkautzer@example.net8",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Quinton Kemmer",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Rusty Mills II",
  //     email: "hortense.bode@example.org6",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Fabian Breitenberg DDS",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Ms. Maybell Orn Jr.",
  //     email: "douglas.beau@example.com3",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Mr. Wilton Nader",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Dr. Eldora Emard",
  //     email: "creinger@example.net9",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "Cecil Franecki",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  //   {
  //     clientName: "Mrs. Eulalia Casper",
  //     email: "client@example.com",
  //     project: "Wellness App Redesign",
  //     status: "Active",
  //     image: "/images/profile.png",
  //     assignedTo: "EMP-3 Dr. Alfred Stark",
  //     lastUpdate: "Aug 6, 2025",
  //   },
  // ];
  if (clientsData.length <= 0)
    return <div className="text-center">No entries</div>;
  return (
    <Table>
      {console.log(clientsData)}
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
        {clientsData.map((client, index) => {
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
                <Link to={`/clients/${client.id}`}>
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
              <Td data={client.lastUpdate} />
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
                      { label: "View", href: `/clients/${client.id}` },
                      { label: "Edit", href: `/clients/${client.id}/edit` },
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
