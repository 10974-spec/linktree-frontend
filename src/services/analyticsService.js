import api from './api';

export const analyticsService = {
  getAnalytics: async (params = {}) => {
    const response = await api.get('/analytics', { params });
    return response.data;
  },

  getLinkAnalytics: async (linkId, params = {}) => {
    const response = await api.get(`/analytics/link/${linkId}`, { params });
    return response.data;
  }
};