import React, { useEffect, useState } from 'react';
import * as styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const SignUp = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:8081/';
  const [form, setForm] = useState({
    userId: '',
    userPassword: '',
    userName: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직을 여기에 추가
    signup(form);
  };

  const handleClick = () => {
    navigate('/auth/login');
  };

  const signup = (param) => {
    //const csrfToken = getCsrfTokenFromCookie();
    const data = {
      user_id: param.userId,
      user_password: param.userPassword,
      username: param.username,
      date_of_birth: moment(param.dateOfBirth).format('YYYYMMDD'),
      phone_number: param.phoneNumber,
      email: param.email,
      address: param.address,
    };

    fetch(url + 'auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='userId'
          placeholder='사용자 아이디'
          value={form.userId}
          onChange={handleChange}
          autocomplete='new-password'
          required
        />
        <input
          type='password'
          name='userPassword'
          placeholder='비밀번호'
          value={form.userPassword}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='username'
          placeholder='이름'
          value={form.name}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='dateOfBirth'
          placeholder='생년월일'
          value={form.dateOfBirth}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='phoneNumber'
          placeholder='휴대폰번호'
          value={form.phoneNumber}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={form.email}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='address'
          placeholder='주소'
          value={form.address}
          autocomplete='new-password'
          onChange={handleChange}
          required
        />
        <button type='submit'>회원가입</button>
      </form>
      <div
        className={styles.guide}
        tabIndex={0}
        onClick={() => {
          handleClick();
        }}
      >
        로그인 하기
      </div>
    </div>
  );
};

export default SignUp;
