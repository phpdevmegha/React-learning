
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '../pages/LoginForm';
import { TodoListPage } from '../pages/TodoListPage';
import AuthContext from '../context/AuthContext';

export const AllRoutes = () => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route 
        path="/" 
        element={state.user ? <Navigate to="/todos" /> : <LoginForm />} 
      />
      <Route 
        path="/todos" 
        element={state.user ? <TodoListPage /> : <Navigate to="/" />} 
      />
    </Routes>
  );
};
