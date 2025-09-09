import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Private from "@/pages/dashboard/Private";
import NotFound from "@/pages/NotFound";
import Advanced from "@/pages/dashboard/advanced";

import RootLayout from "./Layout";
import Overview from "./pages/dashboard/advanced/Overview";
import ClientsDashboard from "@/pages/dashboard/advanced/Clients";
import Projects from "./pages/dashboard/advanced/Projects";
import Tasks from "./pages/dashboard/advanced/Tasks";
import Hr from "./pages/dashboard/advanced/Hr";
import Finance from "./pages/dashboard/advanced/Finance";

import ClientsLayout from "./pages/clients";
import Clients from "./pages/clients/Clients";
import ClientForm from "./pages/clients/ClientForm";
import ClientDetails from "./pages/clients/ClientDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/dashboard/private" replace />} />

        <Route path="dashboard/private" element={<Private />} />
        <Route path="dashboard/advanced" element={<Advanced />}>
          <Route
            index
            element={<Navigate to="/dashboard/advanced/overview" replace />}
          />
          <Route path="overview" element={<Overview />} />
          <Route path="clients" element={<ClientsDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="hr" element={<Hr />} />
          <Route path="finance" element={<Finance />} />
        </Route>

        <Route path="clients" element={<ClientsLayout />}>
          <Route index element={<Clients />} />
          <Route path="add-client" element={<ClientForm />} />
          <Route path=":id" element={<ClientDetails />} />
          <Route path=":id/edit" element={<ClientForm  edit/>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
