import { useState } from "react";
import Icon from "./Icon";
import { Link, useLocation } from "react-router";

const menuItems = [
  {
    label: "Dashboard",
    icon: "home",
    children: [
      { label: "Private", to: "/dashboard/private" },
      { label: "Advanced", to: "/dashboard/advanced" },
    ],
  },
  {
    label: "Clients",
    to: "/clients",
    icon: "users",
  },
  {
    label: "Projects",
    to: "/projects",
    icon: "briefcase",
  },
  {
    label: "tasks",
    to: "/tasks",
    icon: "notes",
  },
  {
    label: "HR",
    icon: "notes",
    children: [
      { label: "Team Members", to: "/hr/team-members" },
      { label: "Department", to: "/hr/department" },
      { label: "Role", to: "/hr/role" },
      { label: "Appreciation", to: "/hr/appreciation" },
    ],
  },
  {
    label: "Finance",
    icon: "notes",
    children: [
      { label: "Paid By", to: "/finance/payment" },
      { label: "Paid To", to: "/finance/team-payment" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    icon: "notes",
  },
  {
    label: "Reports",
    to: "/reports",
    icon: "notes",
  },
  {
    label: "Settings",
    to: "/settings",
    icon: "notes",
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  const toggleMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (to) => pathname === to;

  return (
    <aside className="fixed left-2 top-2 bottom-2 p-4 rounded-lg w-55 bg-surface2 border-2 border-divider typo-cta text-text2 shadow-lg flex flex-col">
      {/* Logo */}
      <Link to="/" className="pb-6 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-12" />
      </Link>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <div key={item.label} className="">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center w-full px-2 py-2 mb-1 rounded-lg hover:bg-divider transition cursor-pointer"
                >
                  {/* {item.icon && <span className="mr-1">{item.icon}</span>} */}
                  {item.icon && <Icon name={item.icon} className="mr-1" />}
                  <span className="flex-1 text-left">{item.label}</span>
                  {openMenus.includes(item.label) ? (
                    <Icon name="arrow" />
                  ) : (
                    <Icon name="arrow" className="rotate-180" />
                  )}
                </button>
                {openMenus.includes(item.label) && (
                  <div className="flex flex-col gap-1">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className={`block pl-9 py-2 rounded-lg transition cursor-pointer ${
                          isActive(sub.to)
                            ? "bg-divider text-text"
                            : "hover:bg-divider hover:text-text"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.to}
                className={`flex items-center px-2 py-2 rounded-lg transition group ${
                  isActive(item.to)
                    ? "bg-divider text-text"
                    : "hover:bg-divider hover:text-text"
                }`}
              >
                {item.icon && <Icon name={item.icon} className="mr-1" />}
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
