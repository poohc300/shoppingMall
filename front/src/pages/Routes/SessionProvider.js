import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/jwtUtils';
import { validateToken } from '../../components/api/Auth';

const SessionValidation = ({ children }) => {
  const navigate = useNavigate();

  const validateSession = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Session validation');
    console.log('current access token: ', accessToken);

    const response = await validateToken(accessToken);
    if (!response.ok) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    validateSession();
  }, [navigate]);

  return <>{children}</>;
};

export default SessionValidation;
