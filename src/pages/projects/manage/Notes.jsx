import { useState } from "react";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import VerifyPassword from "@/components/VerifyPassword";
import NoteDetails from "@/components/NoteDetails";
import { Link } from "react-router";
import { FilterDropdown, Td, Th } from "../../../components/Component";

function Notes() {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
  });
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const projects = [
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 13, 2025",
      deadline: null,
      status: "On Hold",
      progress: "60%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "Review",
      progress: "100%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 13, 2025",
      deadline: "Aug 23, 2025",
      status: "Not Started",
      progress: "0%",
    },
    {
      projectId: "#9F3KDL",
      client: "Lydia Marks",
      projectName: "Mobile Banking App",
      members: "Darius Green",
      startDate: "Jul 20, 2025",
      deadline: "Sep 15, 2025",
      status: "In Progress",
      progress: "45%",
    },
    {
      projectId: "#4X9TQP",
      client: "Orlando Bailey",
      projectName: "E-commerce Platform",
      members: "Sophia Patel",
      startDate: "Jun 1, 2025",
      deadline: "Oct 10, 2025",
      status: "Delayed",
      progress: "30%",
    },
    {
      projectId: "#7M2PLD",
      client: "Clara Fischer",
      projectName: "Marketing Analytics Dashboard",
      members: "Michael Johnson",
      startDate: "Aug 5, 2025",
      deadline: "Sep 30, 2025",
      status: "Review",
      progress: "90%",
    },
    {
      projectId: "#6A1KDE",
      client: "Samuel Harris",
      projectName: "Internal HR Portal",
      members: "Alice Wong",
      startDate: "Jul 10, 2025",
      deadline: "Aug 25, 2025",
      status: "Completed",
      progress: "100%",
    },
  ];
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/projects/add-note"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Note
          </Link>
        </div>
        <FilterDropdown
          label="Status"
          options={["complete", "incomplete"]}
          value={filters.status}
          onSelect={(value) => handleFilterChange("status", value)}
          className="h-8"
        />
      </div>
      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Note title" />
              <Th title="Privacy" />
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td className="first:rounded-l-[4px]  truncate max-w-[400px]">
                  rumon social media marketing
                </Td>

                <Td>
                  <div className="flex items-center w-full h-10 border border-text2 pl-4 rounded-sm typo-b3 text-text">
                    <Icon name="lock" className="mr-2" /> Private
                  </div>
                </Td>

                <Td className="text-left last:rounded-r-[4px] relative">
                  <button
                    // onClick={(e) => handleMenuClick(index, e)}
                    onClick={() => setPaymentModal(true)}
                    className="p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60"
                  >
                    <Icon name="menu" size={20} />
                  </button>
                  {/* <DropdownMenu
                          isOpen={activeMenu === index}
                          onClose={() => setActiveMenu(null)}
                        /> */}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={PaymentsModal} onClose={() => setPaymentModal(false)}>
        {/* <VerifyPassword onClose={() => setPaymentModal(false)} /> */}
        <NoteDetails onClose={() => setPaymentModal(false)} />
      </Modal>
    </>
  );
}

export default Notes;
