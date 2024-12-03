import React from 'react';
import * as styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch = f => f }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.header} tabIndex={0} onClick={() => { navigate('/')}}>
      쇼핑몰
      <Navbar onSearch={onSearch} />
    </div>
  )
};
export default Header;
