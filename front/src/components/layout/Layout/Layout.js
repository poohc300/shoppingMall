import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as styles from './Layout.module.css';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header onSearch={handleSearch} />
      </div>
      <div className={styles.main}>
        <Outlet context={searchQuery} /> {/** 자식 라우트 렌더링 되는 곳 */}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Layout;
