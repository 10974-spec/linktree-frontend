import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    bio: ''
  });
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.profile?.displayName || '',
        bio: user.profile?.bio || ''
      });
      setTheme(user.profile?.theme || {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonColor: '#000000',
        buttonTextColor: '#ffffff'
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleThemeChange = (e) => {
    setTheme({
      ...theme,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await userService.updateProfile(formData);
      updateUser(response.user);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await userService.updateTheme(theme);
      updateUser(response.user);
      setMessage('Theme updated successfully!');
    } catch (error) {
      setMessage('Error updating theme');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Customize your profile appearance and information</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                className="input-field"
                placeholder="Your display name"
                value={formData.displayName}
                onChange={handleProfileChange}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                className="input-field"
                placeholder="Tell people about yourself..."
                value={formData.bio}
                onChange={handleProfileChange}
                maxLength={200}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.bio.length}/200
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Theme Customization */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Theme Customization</h2>
          <form onSubmit={handleThemeSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    name="backgroundColor"
                    className="w-12 h-10 rounded border"
                    value={theme.backgroundColor}
                    onChange={handleThemeChange}
                  />
                  <input
                    type="text"
                    name="backgroundColor"
                    className="input-field flex-1"
                    value={theme.backgroundColor}
                    onChange={handleThemeChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    name="textColor"
                    className="w-12 h-10 rounded border"
                    value={theme.textColor}
                    onChange={handleThemeChange}
                  />
                  <input
                    type="text"
                    name="textColor"
                    className="input-field flex-1"
                    value={theme.textColor}
                    onChange={handleThemeChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    name="buttonColor"
                    className="w-12 h-10 rounded border"
                    value={theme.buttonColor}
                    onChange={handleThemeChange}
                  />
                  <input
                    type="text"
                    name="buttonColor"
                    className="input-field flex-1"
                    value={theme.buttonColor}
                    onChange={handleThemeChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    name="buttonTextColor"
                    className="w-12 h-10 rounded border"
                    value={theme.buttonTextColor}
                    onChange={handleThemeChange}
                  />
                  <input
                    type="text"
                    name="buttonTextColor"
                    className="input-field flex-1"
                    value={theme.buttonTextColor}
                    onChange={handleThemeChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Theme'}
            </button>
          </form>
        </div>
      </div>

      {/* Preview Section */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
        <div 
          className="rounded-lg p-8 text-center"
          style={{ 
            backgroundColor: theme.backgroundColor,
            color: theme.textColor
          }}
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">
              {formData.displayName || user?.username}
            </h3>
            
            {formData.bio && (
              <p className="text-lg opacity-90 mb-6">{formData.bio}</p>
            )}

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="py-3 px-6 rounded-lg font-medium transition-transform hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: theme.buttonColor,
                    color: theme.buttonTextColor
                  }}
                >
                  Sample Link {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;