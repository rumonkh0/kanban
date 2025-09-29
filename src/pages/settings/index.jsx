import { Link, Outlet, useLocation } from "react-router";
import PageTitle from "../../components/PageTitle";

function SettingLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const menuItems = [
    { label: "Company Settings", href: "/settings/company" },
    { label: "Business Address", href: "/settings/business" },
    { label: "Profile Settings", href: "/settings/profile" },
    { label: "Security Settings", href: "/settings/security" },
    { label: "Theme Settings", href: "/settings/theme" },
  ];

  return (
    <>
      <PageTitle title="Setting" />

      {/* Navigation Tabs - Horizontal scroll on mobile, grid on desktop */}
      <div className="overflow-x-auto scrollbar-hide -mt-4 mb-4 z-10">
        <div className="grid grid-cols-5 min-w-[900px] lg:min-w-0 h-12 typo-cta text-text2">
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
    </>
  );
}

export default SettingLayout;
