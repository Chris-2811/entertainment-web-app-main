import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/log-in');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  } else {
    return children;
  }
}

export default ProtectedRoute;
