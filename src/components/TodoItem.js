import React, { useState } from 'react';

export const TodoItem = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 rounded mb-2">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded p-1 mr-2"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <span className="flex-1">{todo.title}</span>
      )}
      <div>
        <button 
          onClick={() => setIsEditing(true)} 
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
