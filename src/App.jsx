import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import PaidFrom from "@/components/PaidFrom";
import PaidTo from "@/components/PaidTo";
import NotFound from "@/pages/NotFound";

import RootLayout from "./Layout";

import Private from "@/pages/dashboard/Private";
import Advanced from "@/pages/dashboard/advanced";
import Overview from "./pages/dashboard/advanced/Overview";
import ClientsDashboard from "@/pages/dashboard/advanced/Clients";
import ProjectsDashboard from "./pages/dashboard/advanced/Projects";
import Tasks from "./pages/dashboard/advanced/Tasks";
import Hr from "./pages/dashboard/advanced/Hr";
import Finance from "./pages/dashboard/advanced/Finance";

import ClientsLayout from "./pages/clients";
import Clients from "./pages/clients/Clients";
import ClientForm from "./pages/clients/ClientForm";
import ClientDetails from "./pages/clients/ClientDetails";

import ProjectsLayout from "./pages/projects";
import Projects from "./pages/projects/Projects";
import ProjectForm from "./pages/projects/ProjectForm";
import ProjectManage from "./pages/projects/ProjectManage";
import ProjectOverview from "./pages/projects/manage/Overview";
import ProjectMembers from "./pages/projects/manage/Members";
import ProjectFiles from "./pages/projects/manage/Files";
import ProjectTask from "./pages/projects/manage/Tasks";
import ProjectTeamPayment from "./pages/projects/manage/TeamPayment";
import ProjectPayment from "./pages/projects/manage/Payment";
import ProjectNotes from "./pages/projects/manage/Notes";
import AddNote from "./pages/projects/manage/AddNote";
import ProjectActivity from "./pages/projects/manage/Activity";

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
          <Route path="projects" element={<ProjectsDashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="hr" element={<Hr />} />
          <Route path="finance" element={<Finance />} />
        </Route>

        <Route path="clients" element={<ClientsLayout />}>
          <Route index element={<Clients />} />
          <Route path="add-client" element={<ClientForm />} />
          <Route path=":id" element={<ClientDetails />} />
          <Route path=":id/edit" element={<ClientForm edit />} />
        </Route>

        <Route path="projects" element={<ProjectsLayout />}>
          <Route index element={<Projects />} />
          <Route path="add-project" element={<ProjectForm />} />
          <Route path="manage" element={<ProjectManage />}>
            <Route
              index
              element={<Navigate to="/projects/manage/overview" replace />}
            />
            <Route path="overview" element={<ProjectOverview />} />
            <Route path="members" element={<ProjectMembers />} />
            <Route path="files" element={<ProjectFiles />} />
            <Route path="tasks" element={<ProjectTask />} />
            <Route path="payment" element={<ProjectPayment />} />
            <Route path="team-payment" element={<ProjectTeamPayment />} />
            <Route path="notes" element={<ProjectNotes />} />
            <Route path="activity" element={<ProjectActivity />} />
          </Route>
          <Route path=":id/edit" element={<ProjectForm edit />} />
          <Route path="add-note" element={<AddNote />} />
          <Route path="paid-by" element={<PaidFrom />} />
          <Route path="paid-to" element={<PaidTo />} />
        </Route>

        <Route path="tasks" element={<ProjectTask />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
