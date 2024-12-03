import React from 'react';
import * as styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch = f => f }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.menu} onClick={() => navigate('/')}>
          홈
        </div>
        <div className={styles.menu} onClick={() => navigate('/customer')}>
          내정보
        </div>
      </div>
      <div className={styles.search}>
        <Navbar onSearch={onSearch} />
      </div>
    </div>
  );
};
export default Header;
