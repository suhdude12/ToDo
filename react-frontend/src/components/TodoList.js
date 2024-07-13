import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Appointment',
      completed: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      completed: false
    }
  ]);

  const [text, setText] = useState('');

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    }));
  }

  return (
    <div className="container">
      <h1>Suhdude's Todo List Project</h1>

      <div className="add-task">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={() => addTask(text)}>Add Task</button>
      </div>

      <h2>Incomplete</h2>
      <ul className="todo-list">
        {tasks.filter(task => !task.completed).map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>

      <h2>Complete</h2>
      <ul>
        {tasks.filter(task => task.completed).map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
