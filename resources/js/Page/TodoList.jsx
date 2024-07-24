import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import '../../css/TodoList.css';
import { baseUrl } from '../Constants/api';

const TodoList = () => {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: '',
    work: '',
    due_date: '',
    image: null
  });
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${baseUrl}todos`);
      console.log(response.data); // Check the structure here
      setTodos(response.data); // Adjust based on actual response structure
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const data = {
      name: newTodo.name,
      work: newTodo.work,
      due_date: newTodo.due_date,
      image: newTodo.image || null,
    }
  
    try {
      await axios.post(`${baseUrl}store-todo`, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchTodos();
      setNewTodo({
        name: '',
        work: '',
        due_date: '',
        image: null
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}delete-todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    
   
   
    try {
      await axios.put(`${baseUrl}update-todo/${id}`, data, {
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'multipart/form-data'
        }
      });
      fetchTodos();
      setEditTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  const handleEditClick = (todo) => {
    setEditTodo(todo);
  };

  const handleEditChange = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form
        onSubmit={addTodo}
        className="todo-form"
      >
        <input
          type="text"
          name="name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="work"
          value={newTodo.work}
          onChange={(e) => setNewTodo({ ...newTodo, work: e.target.value })}
          placeholder="Work"
          required
        />
        <input
          type="date"
          name="due_date"
          value={newTodo.due_date}
          onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
          required
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setNewTodo({ ...newTodo, image: e.target.files[0] })}
        />
        <button type="submit">Add Todo</button>
      </form>

      {editTodo && (
        <div className="edit-form">
          <h2>Edit Todo</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo(editTodo.id, editTodo);
            }}
          >
            <input
              type="text"
              name="name"
              value={editTodo.name}
              onChange={handleEditChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="work"
              value={editTodo.work}
              onChange={handleEditChange}
              placeholder="Work"
              required
            />
            <input
              type="date"
              name="due_date"
              value={editTodo.due_date}
              onChange={handleEditChange}
              required
            />
            {
              editTodo.image && (
                <img src={`https://project-api.test/storage/${editTodo.image}`} className='w-10 h-10 border border-red-500 rounded-full' />
              )
            }
            <input
          type="file"
          name="image"
          onChange={(e) => setEditTodo({ ...editTodo, image: e.target.files[0] })}
        />
            <button type="submit">Update Todo</button>
            <button
              type="button"
              onClick={() => setEditTodo(null)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="todo-list">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={() => handleEditClick(todo)}
            />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
