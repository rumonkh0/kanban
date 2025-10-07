import { Link, Outlet, useLocation } from "react-router";
import PageTitle from "../../../components/PageTitle";

function DashboardAdvancedLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  
  const menuItems = [
    { label: "Overview", href: "/admin/dashboard/advanced/overview" },
    { label: "Clients", href: "/admin/dashboard/advanced/clients" },
    { label: "Projects", href: "/admin/dashboard/advanced/projects" },
    { label: "Tasks", href: "/admin/dashboard/advanced/tasks" },
    { label: "HR", href: "/admin/dashboard/advanced/hr" },
    { label: "Finance", href: "/admin/dashboard/advanced/finance" },
  ];

  return (
    <div>
      <PageTitle title="Dashboard" />
      
      {/* Navigation Tabs - Horizontal scroll on mobile, grid on desktop */}


      
      <div className="overflow-x-auto scrollbar-hide -mt-4 mb-4 z-10">
        <div className="grid grid-cols-6 h-12 typo-cta text-text2 min-w-[600px] lg:min-w-0">
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
      </div>
      
      <Outlet />
    </div>
  );
}

export default DashboardAdvancedLayout;