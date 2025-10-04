import { useState } from "react";
import Icon, {
  Briefcase,
  Finance,
  Home,
  People,
  Service,
  Settings,
  Stat,
  Task,
  Users,
} from "./Icon";
import { Link, useLocation } from "react-router";

const admin = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/dashboard",
    children: [
      { label: "Private", to: "/dashboard/private" },
      { label: "Advanced", to: "/dashboard/advanced" },
    ],
  },
  {
    label: "Clients",
    to: "/clients",
    icon: Users,
  },
  {
    label: "Projects",
    to: "/projects",
    icon: Briefcase,
  },
  {
    label: "tasks",
    to: "/tasks",
    icon: Task,
  },
  {
    label: "HR",
    icon: People,
    to: "/hr",
    children: [
      { label: "Team Members", to: "/hr/team-members" },
      { label: "Department", to: "/hr/departments" },
      { label: "Role", to: "/hr/roles" },
      { label: "Appreciation", to: "/hr/appreciations" },
    ],
  },
  {
    label: "Finance",
    icon: Finance,
    to: "/finance",
    children: [
      { label: "Paid By", to: "/finance/payments" },
      { label: "Paid To", to: "/finance/team-payments" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    icon: Service,
  },
  {
    label: "Reports",
    to: "/reports",
    icon: Stat,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];

const member = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/member/dashboard",
  },
  {
    label: "Tasks",
    icon: Task,
    to: "/member/tasks",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/member/settings",
  },
];
const client = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/client/dashboard",
  },
  {
    label: "Projects",
    icon: Briefcase,
    to: "/client/projects",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/client/settings",
  },
];
export default function Sidebar({ sidebar, isMobileOpen, onClose }) {
  let menuItems = admin;
  if (sidebar === "member") {
    menuItems = member;
  } else if (sidebar === "client") {
    menuItems = client;
  }
  const [openMenus, setOpenMenus] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;

  const toggleMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (to) => pathname.startsWith(to);

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - slides in on mobile, always visible on desktop */}
      <aside
        className={`
          fixed left-2 top-2 bottom-2 p-4 rounded-lg w-55 bg-surface2 border-2 border-divider 
          typo-cta text-text2 shadow-lg flex flex-col z-50 transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-[120%]"}
          lg:translate-x-0
        `}
      >
        {/* Close button for mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-divider"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Logo */}
        <Link
          // to="/"
          className="pb-6 flex items-center justify-center"
          onClick={handleLinkClick}
        >
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
                    {item.icon && (
                      <item.icon
                        className={`mr-1 ${
                          isActive(item.to) ? " text-brand" : "text-text2"
                        }`}
                      />
                    )}
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
                          onClick={handleLinkClick}
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
                  onClick={handleLinkClick}
                  className={`flex items-center px-2 py-2 rounded-lg transition group ${
                    isActive(item.to)
                      ? "bg-divider text-text"
                      : "hover:bg-divider hover:text-text"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`mr-1 h-6 w-6 ${
                        isActive(item.to) ? " text-brand" : "text-text2"
                      }`}
                    />
                  )}
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
