import React, { useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleChange = () => {
    toggleCompleted(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    updateTask(task.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input 
        type="checkbox"
        checked={task.complete}
        onChange={handleChange}
      />
      {isEditing ? (
        <input 
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
      ) : (
        <p>{task.text}</p>
      )}
      <div className="todo-item-buttons">
        <button onClick={() => deleteTask(task.id)}>
          <img src="/delete-icon.png" alt="Delete"/>
        </button>
        {isEditing ? (
          <button onClick={handleUpdate}>
            <img src="/save-icon.png" alt="Save"/>
          </button>
        ) : (
          <button onClick={handleEdit}>
            <img src="/edit-icon.png" alt="Edit"/>
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;





