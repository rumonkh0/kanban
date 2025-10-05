import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboard";

// =========================================================================
// 1. Core Dashboard/Overview Hooks
// =========================================================================

/**
 * Fetches data for the private admin dashboard.
 * Maps to GET /dashboard/private
 */
export const usePrivate = (params) => {
  return useQuery({
    queryKey: ["dashboard", "private", params],
    queryFn: () => dashboardApi.getPrivate(params),
  });
};

/**
 * Fetches core statistical data (total users, projects, etc.).
 * Maps to GET /dashboard/overviewstat
 */
export const useOverviewStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "overviewStat", params],
    queryFn: () => dashboardApi.getOverviewStat(params),
  });
};

/**
 * Fetches finance/payment overview data.
 * Maps to GET /dashboard/overviewfinance
 */
export const useOverviewFinance = (params) => {
  return useQuery({
    queryKey: ["dashboard", "overviewFinance", params],
    queryFn: () => dashboardApi.getOverviewFinance(params),
  });
};

/**
 * Fetches task statistics overview.
 * Maps to GET /dashboard/overviewtasks
 */
export const useOverviewTasks = (params) => {
  return useQuery({
    queryKey: ["dashboard", "overviewTasks", params],
    queryFn: () => dashboardApi.getOverviewTasks(params),
  });
};

/**
 * Fetches deadlines overview.
 * Maps to GET /dashboard/overviewdeadline
 */
export const useOverviewDeadline = (params) => {
  return useQuery({
    queryKey: ["dashboard", "overviewDeadline", params],
    queryFn: () => dashboardApi.getOverviewDeadline(params),
  });
};

// =========================================================================
// 2. Client Section Hooks
// =========================================================================

/**
 * Fetches client-specific statistical data.
 * Maps to GET /dashboard/clientstat
 */
export const useClientStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "clientStat", params],
    queryFn: () => dashboardApi.getClientStat(params),
  });
};

/**
 * Fetches client payment data (e.g., for pie charts/reports).
 * Maps to GET /dashboard/clientpayment
 */
export const useClientPayment = (params) => {
  return useQuery({
    queryKey: ["dashboard", "clientPayment", params],
    queryFn: () => dashboardApi.getClientPayment(params),
  });
};

/**
 * Fetches client project summary data.
 * Maps to GET /dashboard/clientproject
 */
export const useClientProject = (params) => {
  return useQuery({
    queryKey: ["dashboard", "clientProject", params],
    queryFn: () => dashboardApi.getClientProject(params),
  });
};

// =========================================================================
// 3. Project Section Hooks
// =========================================================================

/**
 * Fetches project-specific statistics.
 * Maps to GET /dashboard/projectstat
 */
export const useProjectStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "projectStat", params],
    queryFn: () => dashboardApi.getProjectStat(params),
  });
};

/**
 * Fetches project activity over time.
 * Maps to GET /dashboard/projectactivity
 */
export const useProjectActivity = (params) => {
  return useQuery({
    queryKey: ["dashboard", "projectActivity", params],
    queryFn: () => dashboardApi.getProjectActivity(params),
  });
};

/**
 * Fetches upcoming project deadlines.
 * Maps to GET /dashboard/projectdeadline
 */
export const useProjectDeadline = (params) => {
  return useQuery({
    queryKey: ["dashboard", "projectDeadline", params],
    queryFn: () => dashboardApi.getProjectDeadline(params),
  });
};

// =========================================================================
// 4. Task Section Hooks
// =========================================================================

/**
 * Fetches task-specific statistics.
 * Maps to GET /dashboard/taskstat
 */
export const useTaskStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "taskStat", params],
    queryFn: () => dashboardApi.getTaskStat(params),
  });
};

/**
 * Fetches task activity over time.
 * Maps to GET /dashboard/taskactivity
 */
export const useTaskActivity = (params) => {
  return useQuery({
    queryKey: ["dashboard", "taskActivity", params],
    queryFn: () => dashboardApi.getTaskActivity(params),
  });
};

/**
 * Fetches upcoming task deadlines.
 * Maps to GET /dashboard/taskdeadline
 */
export const useTaskDeadline = (params) => {
  return useQuery({
    queryKey: ["dashboard", "taskDeadline", params],
    queryFn: () => dashboardApi.getTaskDeadline(params),
  });
};

// =========================================================================
// 5. HR Section Hooks
// =========================================================================

/**
 * Fetches overall freelancer/member statistics.
 * Maps to GET /dashboard/hrstat
 */
export const useHrStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "hrStat", params],
    queryFn: () => dashboardApi.getHrStat(params),
  });
};

/**
 * Fetches freelancer status counts.
 * Maps to GET /dashboard/hraccountstat
 */
export const useHrAccountStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "hrAccountStat", params],
    queryFn: () => dashboardApi.getHrAccountStat(params),
  });
};

/**
 * Fetches project data related to team members/freelancers.
 * Maps to GET /dashboard/memberproject
 */
export const useMemberProject = (params) => {
  return useQuery({
    queryKey: ["dashboard", "memberProject", params],
    queryFn: () => dashboardApi.getMemberProject(params),
  });
};

// =========================================================================
// 6. Finance Section Hooks
// =========================================================================

/**
 * Fetches project earnings summary.
 * Maps to GET /dashboard/financestat
 */
export const useFinanceStat = (params) => {
  return useQuery({
    queryKey: ["dashboard", "financeStat", params],
    queryFn: () => dashboardApi.getFinanceStat(params),
  });
};

/**
 * Fetches earnings data segmented by time.
 * Maps to GET /dashboard/financebytime
 */
export const useFinanceByTime = (params) => {
  return useQuery({
    queryKey: ["dashboard", "financeByTime", params],
    queryFn: () => dashboardApi.getFinanceByTime(params),
  });
};

/**
 * Fetches detailed payment records/summary.
 * Maps to GET /dashboard/financepayment
 */
export const useFinancePayment = (params) => {
  return useQuery({
    queryKey: ["dashboard", "financePayment", params],
    queryFn: () => dashboardApi.getFinancePayment(params),
  });
};
