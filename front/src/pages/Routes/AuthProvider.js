import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
