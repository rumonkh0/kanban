import apiClient from "../lib/axios";

export const dashboardApi = {
  // =========================================================================
  // Private
  // =========================================================================

  getPrivate: async (params) => {
    const response = await apiClient.get(`/dashboard/private`, { params });
    return response.data.data;
  },

  // =========================================================================
  // Core Dashboard/Overview Services
  // =========================================================================

  getOverviewStat: async (params) => {
    const response = await apiClient.get(`/dashboard/overviewstat`, { params });
    return response.data.data;
  },
  getOverviewFinance: async (params) => {
    const response = await apiClient.get(`/dashboard/overviewfinance`, {
      params,
    });
    return response.data.data;
  },
  getOverviewTasks: async (params) => {
    const response = await apiClient.get(`/dashboard/overviewtasks`, {
      params,
    });
    return response.data.data;
  },
  getOverviewDeadline: async (params) => {
    const response = await apiClient.get(`/dashboard/overviewdeadline`, {
      params,
    });
    return response.data.data;
  },

  // =========================================================================
  // Client Section Services
  // =========================================================================

  getClientStat: async (params) => {
    const response = await apiClient.get(`/dashboard/clientstat`, { params });
    return response.data.data;
  },
  getClientPayment: async (params) => {
    const response = await apiClient.get(`/dashboard/clientpayment`, {
      params,
    });
    return response.data.data;
  },
  getClientProject: async (params) => {
    const response = await apiClient.get(`/dashboard/clientproject`, {
      params,
    });
    return response.data.data;
  },

  // =========================================================================
  // Project Section Services
  // =========================================================================

  getProjectStat: async (params) => {
    const response = await apiClient.get(`/dashboard/projectstat`, { params });
    return response.data.data;
  },
  getProjectActivity: async (params) => {
    const response = await apiClient.get(`/dashboard/projectactivity`, {
      params,
    });
    return response.data.data;
  },
  getProjectDeadline: async (params) => {
    const response = await apiClient.get(`/dashboard/projectdeadline`, {
      params,
    });
    return response.data.data;
  },

  // =========================================================================
  // Task Section Services
  // =========================================================================

  getTaskStat: async (params) => {
    const response = await apiClient.get(`/dashboard/taskstat`, { params });
    return response.data.data;
  },
  getTaskActivity: async (params) => {
    const response = await apiClient.get(`/dashboard/taskactivity`, { params });
    return response.data.data;
  },
  getTaskDeadline: async (params) => {
    const response = await apiClient.get(`/dashboard/taskdeadline`, { params });
    return response.data.data;
  },

  // =========================================================================
  // HR Section Services
  // =========================================================================

  getHrStat: async (params) => {
    const response = await apiClient.get(`/dashboard/hrstat`, { params });
    return response.data.data;
  },
  getHrAccountStat: async (params) => {
    const response = await apiClient.get(`/dashboard/hraccountstat`, {
      params,
    });
    return response.data.data;
  },
  getMemberProject: async (params) => {
    const response = await apiClient.get(`/dashboard/memberproject`, {
      params,
    });
    return response.data.data;
  },

  // =========================================================================
  // Finance Section Services
  // =========================================================================

  getFinanceStat: async (params) => {
    const response = await apiClient.get(`/dashboard/financestat`, { params });
    return response.data.data;
  },
  getFinanceByTime: async (params) => {
    const response = await apiClient.get(`/dashboard/financebytime`, {
      params,
    });
    return response.data.data;
  },
  getFinancePayment: async (params) => {
    const response = await apiClient.get(`/dashboard/financepayment`, {
      params,
    });
    return response.data.data;
  },
};
