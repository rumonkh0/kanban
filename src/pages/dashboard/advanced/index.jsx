import { Link, Outlet, useLocation } from "react-router";
import PageTitle from "../../../components/PageTitle";

function DashboardAdvancedLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const menuItems = [
    { label: "Overview", href: "/dashboard/advanced/overview" },
    { label: "Clients", href: "/dashboard/advanced/clients" },
    { label: "Projects", href: "/dashboard/advanced/projects" },
    { label: "Tasks", href: "/dashboard/advanced/tasks" },
    { label: "HR", href: "/dashboard/advanced/hr" },
    { label: "Finance", href: "/dashboard/advanced/finance" },
  ];

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-6 h-12 mb-4 typo-cta text-text2 -mt-4 z-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`h-full flex justify-center items-center transition-colors border-b-2 ${
              pathname === item.href
                ? "text-text border-brand"
                : "text-text2 border-divider"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default DashboardAdvancedLayout;
