import React, { useState, useEffect } from 'react';

const LinkForm = ({ link, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: '🔗'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        icon: link.icon
      });
    }
  }, [link]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (link) {
        await onSubmit(link._id, formData);
      } else {
        await onSubmit(formData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const commonIcons = [
    '🔗', '📷', '🎵', '📺', '💼', '📚', '🎮', '🛒', 
    '☕', '📱', '💻', '🎨', '⚽', '🎬', '📖', '🎤'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {link ? 'Edit Link' : 'Add New Link'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="input-field"
              placeholder="e.g., My YouTube Channel"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              name="url"
              required
              className="input-field"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="flex items-center space-x-2">
              <select
                name="icon"
                className="input-field flex-1"
                value={formData.icon}
                onChange={handleChange}
              >
                {commonIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon} {icon === '🔗' ? 'Link' : 
                           icon === '📷' ? 'Instagram' : 
                           icon === '🎵' ? 'Music' : 
                           icon === '📺' ? 'YouTube' : 'Icon'}
                  </option>
                ))}
              </select>
              <span className="text-2xl">{formData.icon}</span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : (link ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkForm;