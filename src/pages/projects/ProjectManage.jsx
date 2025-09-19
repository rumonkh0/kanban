import { Link, Outlet, useLocation, useParams } from "react-router";

function ProjectManage() {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();

  const menuItems = [
    { label: "Overview", href: `/projects/${id}/manage/overview` },
    { label: "Members", href: `/projects/${id}/manage/members` },
    { label: "Files", href: `/projects/${id}/manage/files` },
    { label: "Tasks", href: `/projects/${id}/manage/tasks` },
    { label: "Payment", href: `/projects/${id}/manage/payment` },
    { label: "Team Payment", href: `/projects/${id}/manage/team-payment` },
    { label: "Notes", href: `/projects/${id}/manage/notes` },
    { label: "Activity", href: `/projects/${id}/manage/activity` },
  ];

  return (
    <div>
      <div className="w-full flex justify-between h-12 mb-4 typo-cta border-b-2  border-divider text-text2 z-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`h-full px-4 flex justify-center items-center transition-colors hover:text-text ${
              pathname === item.href
                ? " border-b-2 text-text border-brand"
                : "text-text2"
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

export default ProjectManage;
