import React from 'react';
import * as styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <div className={styles.header}>
      쇼핑몰
      <Navbar />
    </div>
  )
};
export default Header;
