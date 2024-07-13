import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/todos')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const addTask = (text) => {
    axios.post('http://127.0.0.1:5000/api/todos', { text })
      .then(response => {
        setTasks([...tasks, response.data]);
        setText('');
      })
      .catch(error => {
        console.error("There was an error adding the todo!", error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the todo!", error);
      });
  };

  const toggleCompleted = (id) => {
    const task = tasks.find(task => task.id === id);
    axios.put(`http://127.0.0.1:5000/api/todos/${id}`, {
      text: task.text,
      complete: !task.complete
    })
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? response.data : task
        ));
      })
      .catch(error => {
        console.error("There was an error updating the todo!", error);
      });
  };

  const updateTask = (id, newText) => {
    axios.put(`http://127.0.0.1:5000/api/todos/${id}`, {
      text: newText,
      complete: tasks.find(task => task.id === id).complete
    })
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? response.data : task
        ));
      })
      .catch(error => {
        console.error("There was an error updating the todo!", error);
      });
  };

  return (
    <div className="todo-list">
      <h1>Suhdude's Todo List Project</h1>
      <input
        type="text"
        placeholder="Enter a new task"
        value={text}
        onChange={e => setText(e.target.value)} 
      />
      <button onClick={() => addTask(text)}>Add Task</button>

      <h2>Incomplete</h2>
      <ul>
        {tasks.filter(task => !task.complete).map(task => (
          <TodoItem
            key={task.id} 
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateTask={updateTask}
          />
        ))}
      </ul>

      <h2>Complete</h2>
      <ul>
        {tasks.filter(task => task.complete).map(task => (
          <TodoItem
            key={task.id} 
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
