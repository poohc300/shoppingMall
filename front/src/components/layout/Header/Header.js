import React from 'react';
import * as styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';

const Header = ({ onSearch = f => f }) => {
  return (
    <div className={styles.header}>
      쇼핑몰
      <Navbar onSearch={onSearch} />
    </div>
  )
};
export default Header;
