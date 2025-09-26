import React, { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';
import LinkForm from '../components/links/LinkForm';
import LinksList from '../components/links/LinksList';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const linksData = await linkService.getLinks();
      setLinks(linksData);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async (linkData) => {
    try {
      await linkService.createLink(linkData);
      await fetchLinks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating link:', error);
      throw error;
    }
  };

  const handleUpdateLink = async (id, linkData) => {
    try {
      await linkService.updateLink(id, linkData);
      await fetchLinks();
      setEditingLink(null);
    } catch (error) {
      console.error('Error updating link:', error);
      throw error;
    }
  };

  const handleDeleteLink = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await linkService.deleteLink(id);
        await fetchLinks();
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  const handleReorderLinks = async (reorderedLinks) => {
    // This would call an API endpoint to update positions
    // For now, we'll just update the local state
    setLinks(reorderedLinks);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Links</h1>
        <p className="text-gray-600 mt-2">Manage your links and customize your profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Links ({links.length})</h2>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Add New Link
              </button>
            </div>

            <LinksList
              links={links}
              onEdit={setEditingLink}
              onDelete={handleDeleteLink}
              onReorder={handleReorderLinks}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Preview Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h3>
            <div 
              className="rounded-lg p-6 text-center min-h-[200px] flex flex-col items-center justify-center"
              style={{ 
                backgroundColor: user?.profile?.theme?.backgroundColor || '#ffffff',
                color: user?.profile?.theme?.textColor || '#000000'
              }}
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                {user?.profile?.avatar ? (
                  <img 
                    src={user?.profile?.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">👤</span>
                )}
              </div>
              
              <h4 className="text-xl font-semibold mb-2">
                {user?.profile?.displayName || user?.username}
              </h4>
              
              {user?.profile?.bio && (
                <p className="text-sm opacity-80 mb-4">{user.profile.bio}</p>
              )}

              <div className="space-y-2 w-full max-w-xs">
                {links.slice(0, 3).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 rounded-lg font-medium transition-transform hover:scale-105"
                    style={{
                      backgroundColor: user?.profile?.theme?.buttonColor || '#000000',
                      color: user?.profile?.theme?.buttonTextColor || '#ffffff'
                    }}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{links.length}</div>
                <div className="text-sm text-gray-600">Total Links</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {links.reduce((total, link) => total + (link.clicks || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link Form Modal */}
      {(showForm || editingLink) && (
        <LinkForm
          link={editingLink}
          onSubmit={editingLink ? handleUpdateLink : handleCreateLink}
          onClose={() => {
            setShowForm(false);
            setEditingLink(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;