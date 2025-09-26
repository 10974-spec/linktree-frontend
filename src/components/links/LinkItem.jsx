import React from 'react';

const LinkItem = ({ link, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <span className="text-xl">{link.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{link.title}</h4>
          <p className="text-sm text-gray-600 truncate">{link.url}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-gray-500">
              Clicks: {link.clicks || 0}
            </span>
            <span className="text-xs text-gray-500">
              Position: {link.position + 1}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(link)}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          title="Edit link"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(link._id)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Delete link"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default LinkItem;