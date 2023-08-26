import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar, faCheckSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import './TodoApp.css'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState('light');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const todo = {
      id: uuidv4(),
      task: newTodo,
      favorite: false,
      reminder: false,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoFavorite = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    );
  };

  const handleTodoReminder = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: !todo.reminder } : todo
      )
    );
  };

  const handleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoEdit = (id, updatedTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      )
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`todo-app ${theme}`}>
      <h1>Todo App</h1>

      <form onSubmit={handleTodoSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''} ${
              todo.favorite ? 'favorite' : ''
            } ${todo.reminder ? 'reminder' : ''}`}
          >
            <div className="task-info">
              <span
                className={`task-text ${todo.favorite ? 'favorite' : ''}`}
                onClick={() => handleTodoComplete(todo.id)}
              >
                {todo.task}
              </span>
              {todo.reminder && <span className="reminder">Reminder!</span>}
            </div>
            <div className="task-actions">
              <button onClick={() => handleTodoFavorite(todo.id)}>
                <FontAwesomeIcon icon={faStar} />
              </button>
              <button onClick={() => handleTodoReminder(todo.id)}>
                <FontAwesomeIcon icon={faCheckSquare} />
              </button>
              <button onClick={() => handleTodoDelete(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => handleTodoEdit(todo.id, prompt('Enter updated task:', todo.task))}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="theme-switch">
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default TodoApp;