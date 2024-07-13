import React from 'react';
import deleteIcon from './delete-icon.png';
import editIcon from './edit-icon.png';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <li className="todo-item">
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
      />
      <p>{task.text}</p>
      <button onClick={() => deleteTask(task.id)}>
        <img src={deleteIcon} alt="Delete" />
      </button>
      <button>
        <img src={editIcon} alt="Edit" />
      </button>
    </li>
  );
}

export default TodoItem;
