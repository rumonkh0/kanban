import { Link } from "react-router";
import Icon from "@/components/Icon";
import { ImageName, Table, Td, Th, Thead } from "../../components/Component";

function ClientTable() {
  const clients = [
    {
      clientName: "Gustave Koeipin",
      email: "caitlyn66@example.net7",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Prof. Toni Swift",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Brayan Gutkowski",
      email: "raul.dicki@example.com7",
      project: "Corporate Website Revamp",
      status: "Active",
      assignedTo: "Pasquale O'Connell",
      lastUpdate: "Aug 3, 2025",
    },
    {
      clientName: "Lavon Effertz",
      email: "eklocko@example.com2",
      project: "E-Commerce Platform",
      status: "Active",
      assignedTo: "Mrs. Angela Bechtelar Jr.",
      lastUpdate: "Jul 30, 2025",
    },
    {
      clientName: "Brycen Sipes",
      email: "rickey87@example.com8",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Celia Jast",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Randy Botsford Jr.",
      email: "abshire.keenan@example.net7",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Mrs. Yesenia Shields",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Miss Esmeralda Gerhold",
      email: "gkautzer@example.net8",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Quinton Kemmer",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Rusty Mills II",
      email: "hortense.bode@example.org6",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Fabian Breitenberg DDS",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Ms. Maybell Orn Jr.",
      email: "douglas.beau@example.com3",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Mr. Wilton Nader",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Dr. Eldora Emard",
      email: "creinger@example.net9",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "Cecil Franecki",
      lastUpdate: "Aug 6, 2025",
    },
    {
      clientName: "Mrs. Eulalia Casper",
      email: "client@example.com",
      project: "Wellness App Redesign",
      status: "Active",
      assignedTo: "EMP-3 Dr. Alfred Stark",
      lastUpdate: "Aug 6, 2025",
    },
  ];
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
        {clients.map((project, index) => (
          <tr
            key={index}
            className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
          >
            {/* Client Name with Avatar */}
            <Td className="first:rounded-l-[4px]">
              <Link to="/clients/3">
                <ImageName
                  image="/images/profile.png"
                  username={project.clientName}
                />
              </Link>
            </Td>

            <Td data={project.email} />
            <Td data={project.project} />
            <Td>
              <div className={`text-xs typo-b3 flex items-center gap-2`}>
                <p
                  className={`w-2 h-2 rounded-full ${
                    project.status === "Active" ? "bg-success" : "bg-brand"
                  }`}
                ></p>
                {project.status}
              </div>
            </Td>
            <Td>
              <ImageName
                image="/images/profile.png"
                username={project.assignedTo}
              />
            </Td>
            <Td data={project.lastUpdate} />
            <Td className="text-left last:rounded-r-[4px]">
              <Link to="/clients/3">
                <button className="p-2 rounded-full cursor-pointer hover:bg-surface2/60">
                  <Icon name="menu" size={20} />
                </button>
              </Link>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClientTable;
