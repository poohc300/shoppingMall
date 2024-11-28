import React from 'react';
import * as styles from './Header.module.css';

const Header = () => {
  console.log(styles);
  return <div className={styles.header}>My tech blog</div>;
};
export default Header;
