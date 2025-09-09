import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import { PageTitleProvider } from "./context/PageTitleContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

// export const metadata = {
//   title: "Creative CRM",
//   description: "kanban style CRM for creative agencies",
// };

export default function RootLayout() {
  return (
    <>
      <PageTitleProvider>
      <Sidebar />
      <div className="fixed left-57 top-0 bottom-0 right-0 p-2 flex flex-col flex-1 gap-4">
        <Header />
        <main className="relative flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      </PageTitleProvider>
    </>
  );
}
