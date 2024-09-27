import React, { useContext, useEffect, useReducer } from 'react';
import AuthContext from '../context/AuthContext';
import { AddTodoForm }  from '../components/AddTodoForm';
import { TodoList } from '../components/ToDoList';

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), title: action.payload, completed: false }];
    case 'EDIT':
      return state.map(todo => 
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export const TodoListPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [todos, dispatchTodos] = useReducer(todosReducer, initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    dispatchTodos({ type: 'ADD', payload: title });
  };

  const editTodo = (id, title) => {
    dispatchTodos({ type: 'EDIT', payload: { id, title } });
  };

  const deleteTodo = (id) => {
    dispatchTodos({ type: 'DELETE', payload: id });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
    </div>
  );
};
