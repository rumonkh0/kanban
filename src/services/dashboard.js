import apiClient from "../lib/axios";

export const dashboardApi = {
  // =========================================================================
  // Private
  // =========================================================================

  getPrivate: async (params) => {
    const response = await apiClient.get(`/dashboard/private`, { params });
    return response.data.data;
  },
  getPrivateCalander: async () => {
    const response = await apiClient.get(`/dashboard/privatecalander`);
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

  // =========================================================================
  // Client Section Services (Specific Client)
  // =========================================================================

  /**
   * Fetches overall project statistics for a specific client.
   * Maps to GET /client/:clientId/clientstat
   */
  getClientSpecificStat: async (clientId, params) => {
    // Note: clientId is passed directly in the URL path
    const response = await apiClient.get(
      `/dashboard/client/${clientId}/clientstat`,
      { params }
    );
    return response.data.data;
  },

  /**
   * Fetches project status breakdown (e.g., pie chart data) for a specific client.
   * Maps to GET /client/:clientId/clientproject
   */
  getClientProjectStatusPie: async (clientId, params) => {
    const response = await apiClient.get(
      `/dashboard/client/${clientId}/clientproject`,
      { params }
    );
    return response.data.data;
  },

  /**
   * Fetches payment and due summary for projects associated with a specific client.
   * Maps to GET /client/:clientId/clientpayment
   */
  getClientProjectPayment: async (clientId, params) => {
    const response = await apiClient.get(
      `/dashboard/client/${clientId}/clientpayment`,
      { params }
    );
    return response.data.data;
  },

  // =========================================================================
  // Freelancer Section Services (Specific Freelancer)
  // =========================================================================

  getFreelancerStats: async (freelancerId, params) => {
    // Note: freelancerId is passed directly in the URL path
    const response = await apiClient.get(
      `/dashboard/freelancer/${freelancerId}/freelancerstat`,
      { params }
    );
    return response.data.data;
  },

  getFreelancerTaskSummary: async (freelancerId, params) => {
    const response = await apiClient.get(
      `/dashboard/freelancer/${freelancerId}/freelancertask`,
      { params }
    );
    return response.data.data;
  },

  getFreelancerEarningsStats: async (freelancerId, params) => {
    const response = await apiClient.get(
      `/dashboard/freelancer/${freelancerId}/freelancerearning`,
      { params }
    );
    return response.data.data;
  },

  // =========================================================================
  // Report Section Services (Assuming base path is '/')
  // =========================================================================

  getTaskReport: async (params) => {
    const response = await apiClient.get("/dashboard/taskreport", { params });
    return response.data.data;
  },

  getRevenueReport: async (params) => {
    const response = await apiClient.get("/dashboard/taskrevenuereport", {
      params,
    });
    return response.data.data;
  },

  getProjectsReport: async (params) => {
    const response = await apiClient.get("/dashboard/taskprojectreport", {
      params,
    });
    return response.data.data;
  },

  getTaskStageReport: async (params) => {
    const response = await apiClient.get("/dashboard/taskstagereport", {
      params,
    });
    return response.data.data;
  },
};
