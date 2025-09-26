import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { linkService } from '../services/linkService';

const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError('');

      // If viewing own profile, use current user data (faster)
      if (currentUser && username === currentUser.username) {
        const linksData = await linkService.getLinks();
        setProfileUser(currentUser);
        setLinks(linksData);
      } else {
        // Fetch public profile from API for other users
        const response = await userService.getPublicProfile(username);
        setProfileUser(response.user);
        setLinks(response.links);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response?.status === 404) {
        setError('Profile not found');
      } else {
        setError('Error loading profile');
      }
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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Profile Not Found'}
          </h1>
          <p className="text-gray-600 mb-4">
            {error || 'The profile you\'re looking for doesn\'t exist.'}
          </p>
          <button
            onClick={() => navigate(currentUser ? '/dashboard' : '/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            {currentUser ? 'Back to Dashboard' : 'Go to Login'}
          </button>
        </div>
      </div>
    );
  }

  const theme = profileUser.profile?.theme || {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff'
  };

  const displayName = profileUser.profile?.displayName || profileUser.username;
  const bio = profileUser.profile?.bio || '';

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: '100vh'
      }}
    >
      <div className="max-w-md w-full text-center">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            {profileUser.profile?.avatar ? (
              <img 
                src={profileUser.profile.avatar} 
                alt={`${displayName}'s profile`} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {displayName}
          </h1>
          
          {bio && (
            <p className="text-lg opacity-90">{bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.filter(link => link.isActive).map((link) => (
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
              <span className="mr-3">{link.icon || '🔗'}</span>
              {link.title}
            </a>
          ))}
          
          {links.filter(link => link.isActive).length === 0 && (
            <div className="text-center py-8 opacity-70">
              <p>No links available yet</p>
            </div>
          )}
          <button onClick={() => navigate('/Login')} className='btn-primary'>Join Us</button>
        </div>

        {/* Footer */}
        <div className="mt-12 opacity-70">
          <p className="text-sm">@{profileUser.username}</p>
          <p className="text-xs mt-1">Powered by BioDeck</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;