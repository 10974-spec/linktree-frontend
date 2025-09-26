import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LinkItem from './LinkItem';

const LinksList = ({ links, onEdit, onDelete, onReorder }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [reorderedItem] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, reorderedItem);

    // Update positions
    const updatedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      position: index
    }));

    onReorder(updatedLinks);
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔗</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
        <p className="text-gray-600">Start by adding your first link to share with the world!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {links.map((link, index) => (
              <Draggable key={link._id} draggableId={link._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <LinkItem
                      link={link}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Simple version without drag-and-drop (install react-beautiful-dnd later)
const SimpleLinksList = ({ links, onEdit, onDelete }) => {
  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔗</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
        <p className="text-gray-600">Start by adding your first link to share with the world!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkItem
          key={link._id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SimpleLinksList;