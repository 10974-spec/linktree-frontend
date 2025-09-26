import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';
import { linkService } from '../services/linkService';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    try {
      const [analyticsData, linksData] = await Promise.all([
        analyticsService.getAnalytics({ timeRange }),
        linkService.getLinks()
      ]);
      
      setAnalytics(analyticsData);
      setLinks(linksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data yet</h3>
          <p className="text-gray-600">Start sharing your links to see analytics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Track your link performance and audience insights</p>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {analytics.totalClicks}
          </div>
          <div className="text-gray-600">Total Clicks</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {links.length}
          </div>
          <div className="text-gray-600">Active Links</div>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {analytics.totalClicks > 0 ? (analytics.totalClicks / links.length).toFixed(1) : 0}
          </div>
          <div className="text-gray-600">Clicks per Link</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Links */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Links</h2>
          <div className="space-y-3">
            {analytics.topLinks.slice(0, 5).map((link, index) => (
              <div key={link._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{link.icon || '🔗'}</span>
                  <div>
                    <div className="font-medium text-gray-900">{link.title}</div>
                    <div className="text-sm text-gray-600 truncate max-w-xs">{link.url}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">{link.analyticsCount || link.clicks}</div>
                  <div className="text-xs text-gray-500">clicks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Clicks Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Clicks Over Time</h2>
          <div className="space-y-2">
            {analytics.dailyClicks.map((day) => (
              <div key={day._id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{day._id}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{
                        width: `${(day.clicks / Math.max(...analytics.dailyClicks.map(d => d.clicks))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{day.clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Link-specific Analytics */}
      {selectedLink && (
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Analytics for: {selectedLink.title}
          </h2>
          {/* Detailed analytics for specific link would go here */}
        </div>
      )}
    </div>
  );
};

export default Analytics;