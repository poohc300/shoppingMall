import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as styles from './Layout.module.css';

const Layout = () => {
  console.log('Layout rendered'); // 디버깅 로그 추가
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.main}>
        <Outlet /> {/** 자식 라우트 렌더링 되는 곳 */}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Layout;
