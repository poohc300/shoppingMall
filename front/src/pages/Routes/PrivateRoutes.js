import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';

const PrivateRoute = ({ element: Component }) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken:', accessToken);

  const isAuthenticated = accessToken && !isTokenExpired(accessToken);

  return (
    <Route
      element={isAuthenticated ? <Component /> : <Navigate to='/auth/login' />}
    />
  );
};

export default PrivateRoute;
