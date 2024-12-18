import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';

const PrivateRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = accessToken && !isTokenExpired(accessToken);

  if (!isAuthenticated) {
    navigate('/auth/login');
  }

  return <Component />;
};

export default PrivateRoute;
