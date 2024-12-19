import React, { useContext, useEffect } from 'react';
import * as styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../pages/Routes/AuthProvider';
import { getUserIdFromRefreshToken } from '../../../utils/jwtUtils';

const Header = ({ onSearch = (f) => f }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useContext(AuthContext);
  const url = 'http://localhost:8081/auth/';

  const handleClick = () => {
    const userId = getUserIdFromRefreshToken();
    logout(userId);
  };
  const logout = (userId) => {
    const data = {
      user_id: userId,
    };
    console.log('logout data: ', data);
    fetch(url + 'logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData));
          });
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/auth/login');
      });
  };
  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.menu} onClick={() => navigate('/')}>
          홈
        </div>
        <div className={styles.menu} onClick={() => navigate('/customer')}>
          내정보
        </div>
        {isAuthenticated ? (
          <div className={styles.menu}>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {location.pathname === '/' && (
        <div className={styles.search}>
          <Navbar onSearch={onSearch} />
        </div>
      )}
    </div>
  );
};
export default Header;
