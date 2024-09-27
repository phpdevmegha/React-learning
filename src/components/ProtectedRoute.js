// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useAuth();

//   if (!isLoggedIn) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  return state.user ? children : <Navigate to="/" />;
};
