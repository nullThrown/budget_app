import { useState } from 'react';
import '../forms.css';
export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
  };
  return (
    <form className='form' onSubmit={(e) => submitHandler(e)}>
      <h2>Login</h2>
      <label htmlFor='email'>email</label>
      <input
        type='email'
        id='email'
        name='email'
        value={userData.email}
        className='mb-1'
        required
        onChange={(e) => onChangeHandler(e)}
      />
      <label htmlFor='password'>password</label>
      <input
        type='password'
        id='password'
        name='password'
        value={userData.password}
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <span>
        <a href='#' className='link'>
          Forgot Password?
        </a>
      </span>
      <button type='submit' className='btn btn-submit'>
        Login
      </button>
      <span className='link-sign-up'>
        Don't have an account?{' '}
        <a href='#' className='link'>
          Sign Up
        </a>
      </span>
    </form>
  );
};
