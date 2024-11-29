import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Outlet /> {/** 자식 라우트 렌더링 되는 곳 */}
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
