import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/log-in"></Navigate>;
  } else {
    return children;
  }
}

export default ProtectedRoute;
