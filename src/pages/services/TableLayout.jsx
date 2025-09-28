import { Link, Outlet, useLocation } from "react-router";

function ServiceLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const menuItems = [
    { label: "Main Tracker", href: "/services/trackers" },
    { label: "Service Details", href: "/services/services" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 h-12 mb-4 typo-cta text-text2 -mt-4 z-10">
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

export default ServiceLayout;
