import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = useContext(AuthContext);
  return isAuthenticated ? (
    <Component isAuthenticated={isAuthenticated} />
  ) : null;
};

export default PrivateRoute;
