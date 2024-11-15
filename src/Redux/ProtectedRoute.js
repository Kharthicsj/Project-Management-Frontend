import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
