import React, { useState } from 'react';
import styles from './Auth.module.css';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
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
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='userId'
          placeholder='사용자 아이디'
          value={form.user_id}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='userPassword'
          placeholder='비밀번호'
          value={form.user_password}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='username'
          placeholder='이름'
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='dateOfBirth'
          placeholder='생년월일'
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='phoneNumber'
          placeholder='휴대폰번호'
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='address'
          placeholder='주소'
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
