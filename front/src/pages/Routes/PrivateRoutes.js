import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';

const PrivateRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      alert('토큰이 존재하지 않아 로그인 페이지로 이동합니다');
      navigate('/auth/login');
    }

    if (accessToken && isTokenExpired(accessToken)) {
      console.log(isTokenExpired(accessToken));
      alert('토큰이 만료되어 로그인 페이지로 이동합니다');

      navigate('/auth/login');
    }

    if (accessToken && !isTokenExpired(accessToken)) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated ? <Component /> : null;
};

export default PrivateRoute;
