import React, { useState } from 'react';
import styles from './Auth.module.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직을 여기에 추가
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='user_id'
          placeholder='Username'
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>로그인</button>
      </form>
    </div>
  );
};

export default Login;
