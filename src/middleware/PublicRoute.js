import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    // If token exists, redirect to map or another protected route
    return <Navigate to="/map" />;
  }

  // If no token, allow access to the public route (Login or Register)
  return children;
}

export default PublicRoute;
