import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { linkService } from '../services/linkService';

const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      // If the username matches the current user, use their data
      if (username === currentUser?.username) {
        const linksData = await linkService.getLinks();
        setUser(currentUser);
        setLinks(linksData);
      } else {
        // For now, only show current user's profile
        // In a real app, you'd fetch the public profile from API
        setError('Profile not found');
      }
    } catch (err) {
      setError('Error loading profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (linkId) => {
    try {
      await linkService.recordClick(linkId);
    } catch (error) {
      console.error('Error recording click:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const theme = user.profile?.theme || {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff'
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: theme.backgroundColor,
        color: theme.textColor
      }}
    >
      <div className="max-w-md w-full text-center">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            {user.profile?.avatar ? (
              <img 
                src={user.profile.avatar} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {user.profile?.displayName || user.username}
          </h1>
          
          {user.profile?.bio && (
            <p className="text-lg opacity-90">{user.profile.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.filter(link => link.isActive).map((link, index) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link._id)}
              className="block w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: theme.buttonColor,
                color: theme.buttonTextColor
              }}
            >
              <span className="mr-3">{link.icon}</span>
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 opacity-70">
          <p className="text-sm">Powered by LinkTree Clone</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;