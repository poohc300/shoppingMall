import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as styles from './Layout.module.css';

const Layout = () => {
  useEffect(() => {
    console.log('Layout Component 렌더링됨');
  }, []);
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
