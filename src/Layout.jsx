import { useCallback, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function RootLayout({ sidebar = "admin" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuClick = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  // 4. Memoize the function for closing the sidebar
  const handleCloseSidebar = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        isMobileOpen={isMobileMenuOpen}
        onClose={handleCloseSidebar}
      />
      {/* Changed: left-57 becomes left-0 on mobile, left-57 on lg+ screens */}
      <div className="fixed left-0 lg:left-57 top-0 bottom-0 right-0 py-2 flex flex-col flex-1 gap-2 md:gap-4">
        <Header onMenuClick={handleMenuClick} />
        <main className="relative flex-1 px-2 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
