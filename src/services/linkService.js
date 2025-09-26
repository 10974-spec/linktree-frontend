import api from './api';

export const linkService = {
  getLinks: async () => {
    const response = await api.get('/links');
    return response.data;
  },

  createLink: async (linkData) => {
    const response = await api.post('/links', linkData);
    return response.data;
  },

  updateLink: async (id, linkData) => {
    const response = await api.put(`/links/${id}`, linkData);
    return response.data;
  },

  deleteLink: async (id) => {
    const response = await api.delete(`/links/${id}`);
    return response.data;
  },

  recordClick: async (id) => {
    const response = await api.post(`/links/${id}/click`);
    return response.data;
  }
};