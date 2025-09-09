import { Icon, ImageName, Td, Th } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Link } from "react-router";

function AppreciationTable() {
  const awards = [
    {
      name: "Sarah Johnson",
      department: "Design",
      role: "Project Manager",
    },
    {
      name: "Michael Chen",
      department: "Design",
      role: "Frontend Developer",
    },
    {
      name: "Emma Rodriguez",
      department: "Design",
      role: "UX Designer",
    },
    {
      name: "David Kim",
      department: "Design",
      role: "Backend Engineer",
    },
    {
      name: "Priya Patel",
      department: "Design",
      role: "Quality Assurance Analyst",
    },
  ];
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  return (
    <>
      <PageTitle title="Appreciation" />
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/hr/add-appreciation"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Appreciation
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Award Name" />
              <Th title="Giving To" />
              <Th title="Giving By" />
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {awards.map((award, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td className="irst:rounded-l-[4px]">{award.name}</Td>
                <Td>
                  <ImageName
                    image="/images/profile.png"
                    username={award.name}
                    designation={award.role}
                  />
                </Td>
                <Td>
                  <ImageName
                    image="/images/profile.png"
                    username={award.name}
                    designation={award.role}
                  />
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
                          label: "Delete",
                          onClick: () => console.log("Deleted"),
                        },
                      ]}
                    />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AppreciationTable;
