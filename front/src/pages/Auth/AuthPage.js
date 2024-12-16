import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './Auth.module.css';

const AuthPage = () => {
  return (
    <div className={styles.authContainer}>
      <Outlet />
    </div>
  );
};

export default AuthPage;
