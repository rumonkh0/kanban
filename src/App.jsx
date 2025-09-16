import "./App.css";
import { Routes, Route, Navigate } from "react-router";
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
import ProjectTask from "./pages/tasks/Task";
import TeamPayment from "./pages/finance/TeamPayment";
import Payment from "./pages/finance/Payment";
import ProjectNotes from "./pages/projects/manage/Notes";
import AddNote from "./pages/projects/manage/AddNote";
import ProjectActivity from "./pages/projects/manage/Activity";

import HrLayout from "./pages/hr";
import TeamMember from "./pages/hr/teamMember/TeamMember";
import TeamMemberForm from "./pages/hr/teamMember/TeamMemberForm";
import TeamMemberDetails from "./pages/hr/teamMember/TeamMemberDetails";
import DepartmentTable from "./pages/hr/department/DepartmentTable";
import DepartmentForm from "./pages/hr/department/DepartmentForm";
import AppreciationTable from "./pages/hr/appreciation/AppreciationTable";
import AppreciationForm from "./pages/hr/appreciation/AppreciationForm";
import RoleTable from "./pages/hr/role/RoleTable";
import RoleForm from "./pages/hr/role/RoleForm";
import PaidByForm from "./pages/finance/PaidByForm";
import PaidToForm from "./pages/finance/PaidToForm";

import FinanceLayout from "./pages/finance";
import ServiceLayout from "./pages/services";
import TableLayout from "./pages/services/TableLayout";
import MainTracker from "./pages/services/MainTracker";
import ServiceDetails from "./pages/services/ServiceDetails";
import AddTracker from "./pages/services/AddTracker";
import AddService from "./pages/services/AddService";

import SettingLayout from "./pages/settings";
import CompanySetting from "./pages/settings/CompanySetting";
import BusinessAdress from "./pages/settings/BusinessAdress";
import ProfileSetting from "./pages/settings/ProfileSetting";
import SecuritySetting from "./pages/settings/SecuritySetting";
import ThemeSetting from "./pages/settings/ThemeSetting";

import LoginLayout from "./pages/login";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import Otp from "./pages/login/Otp";
import Reports from "./pages/reports/Reports";
import MembersDashboard from "./pages/member/Dashboard";
import MemberTask from "./pages/member/Task";

import ClientDashboard from "./pages/client/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="otp" element={<Otp />} />
      </Route>

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
            <Route path="payment" element={<Payment />} />
            <Route
              path="team-payment"
              element={<TeamPayment toHref="/projects/paid-to" />}
            />
            <Route path="notes" element={<ProjectNotes />} />
            <Route path="activity" element={<ProjectActivity />} />
          </Route>
          <Route path=":id/edit" element={<ProjectForm edit />} />
          <Route path="add-note" element={<AddNote />} />
          <Route path="paid-by" element={<PaidByForm />} />
          <Route path="paid-to" element={<PaidToForm />} />
        </Route>

        <Route path="tasks" element={<ProjectTask />} />

        <Route path="hr" element={<HrLayout />}>
          <Route index element={<Navigate to="/hr/team-members" replace />} />
          <Route path="team-members" element={<TeamMember />} />
          <Route path="add-team-member" element={<TeamMemberForm />} />
          <Route path="team-member/:id" element={<TeamMemberDetails />} />
          <Route
            path="team-member/:id/edit"
            element={<TeamMemberForm edit title="Edit Team Member Details" />}
          />

          <Route path="department" element={<DepartmentTable />} />
          <Route path="add-department" element={<DepartmentForm />} />
          <Route
            path="department/:id/edit"
            element={<DepartmentForm edit title="Edit Department" />}
          />

          <Route path="appreciation" element={<AppreciationTable />} />
          <Route path="add-appreciation" element={<AppreciationForm />} />
          <Route
            path="appreciation/:id/edit"
            element={<AppreciationForm edit title="Edit Appreciation" />}
          />

          <Route path="role" element={<RoleTable />} />
          <Route path="add-role" element={<RoleForm />} />
          <Route
            path="role/:id/edit"
            element={<RoleForm edit title="Edit Role" />}
          />
        </Route>

        <Route path="finance" element={<FinanceLayout />}>
          <Route index element={<Navigate to="/finance/payment" replace />} />
          <Route path="payment" element={<Payment />} />
          <Route
            path="team-payment"
            element={<TeamPayment toHref="/finance/paid-to" />}
          />
          <Route path="paid-by" element={<PaidByForm />} />
          <Route path="paid-to" element={<PaidToForm />} />
        </Route>

        <Route path="services" element={<ServiceLayout />}>
          <Route element={<TableLayout />}>
            <Route
              index
              element={<Navigate to="/services/main-tracker" replace />}
            />
            <Route path="main-tracker" element={<MainTracker />} />
            <Route path="service-details" element={<ServiceDetails />} />
          </Route>
          <Route path="add-tracker" element={<AddTracker />} />
          <Route path="add-service" element={<AddService />} />
        </Route>

        <Route path="reports" element={<Reports />} />

        <Route path="settings" element={<SettingLayout />}>
          <Route index element={<Navigate to="/settings/company" replace />} />
          <Route path="company" element={<CompanySetting />} />
          <Route path="business" element={<BusinessAdress />} />
          <Route path="profile" element={<ProfileSetting role="admin" />} />
          <Route path="security" element={<SecuritySetting />} />
          <Route path="theme" element={<ThemeSetting />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/member" element={<RootLayout sidebar="member" />}>
        <Route index element={<Navigate to="/member/dashboard" replace />} />
        <Route path="dashboard" element={<MembersDashboard />} />
        <Route path="tasks" element={<MemberTask />} />
        <Route path="settings" element={<ProfileSetting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/client" element={<RootLayout sidebar="client" />}>
        <Route index element={<Navigate to="/client/dashboard" replace />} />
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="projects" element={<ProjectTask />} />
        <Route path="settings" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
