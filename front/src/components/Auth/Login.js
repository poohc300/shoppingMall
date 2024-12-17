import React, { useEffect, useState } from 'react';
import * as styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:8081/';

  const [form, setForm] = useState({
    user_id: '',
    user_password: '',
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
    login(form);
  };

  const login = (param) => {
    const data = {
      user_id: param.user_id,
      user_password: param.user_password,
    };

    fetch(url + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData));
          });
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch((error) => alert(error));
  };

  const handleClick = () => {
    navigate('/auth/signup');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token:: ', token);
    if (token) {
      fetch(url + 'auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            navigate('/');
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='user_id'
          placeholder='ID'
          value={form.user_id}
          onChange={handleChange}
          autocomplete='new-password'
          required
        />
        <input
          type='password'
          name='user_password'
          placeholder='Password'
          value={form.user_password}
          onChange={handleChange}
          autocomplete='new-password'
          required
        />
        <button type='submit'>로그인</button>
      </form>
      <div
        className={styles.guide}
        tabIndex={0}
        onClick={() => {
          handleClick();
        }}
      >
        회원가입 하기
      </div>
    </div>
  );
};

export default Login;
