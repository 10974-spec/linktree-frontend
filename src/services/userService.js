import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  updateTheme: async (themeData) => {
    const response = await api.put('/users/theme', themeData);
    return response.data;
  },

  uploadAvatar: async (formData) => {
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getPublicProfile: async (username) => {
    // This would be a public endpoint - for now we'll use the current user
    const response = await api.get('/users/profile');
    return response.data;
  }
};

export default userService;