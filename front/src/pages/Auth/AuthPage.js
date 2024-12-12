import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import styles from './Auth.module.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.toggleButtons}>
        <button onClick={toggleAuthMode}>
          {isSignUp ? '로그인' : '회원가입'}
        </button>
      </div>
      {isSignUp ? <SignUp /> : <Login />}
    </div>
  );
};

export default AuthPage;
