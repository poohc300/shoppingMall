import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as styles from './Layout.module.css';

const Layout = () => {
  const [data, setData] = useState({
    query: '',
    category: '',
  });

  const handleSearch = (query, category) => {
    setData({
      query: query,
      category: category,
    });
  };
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header onSearch={handleSearch} />
      </div>
      <div className={styles.main}>
        <Outlet context={data} /> {/** 자식 라우트 렌더링 되는 곳 */}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Layout;
