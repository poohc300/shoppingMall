import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';

const PrivateRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = accessToken && !isTokenExpired(accessToken);
  console.log('현재 인증상태: ', isAuthenticated);
  if (!isAuthenticated) {
    navigate('/auth/login');
  }

  return <Component />;
};

export default PrivateRoute;
