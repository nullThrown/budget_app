import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../forms.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../features/auth/user';
import { useNavigate } from 'react-router-dom';
import InputItem from '../profile/inputItem';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e) => {
    if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
    navigate('/home');
  };
  return (
    <main className='form-container'>
      <form className='form' onSubmit={(e) => submitHandler(e)}>
        <h2 className='heading-3 text-center'>Login</h2>
        <div className='form-box'>
          <InputItem
            autoFocus
            title='Email'
            name='email'
            type='email'
            value={userData.email}
            onInputChange={onInputChange}
          />
          <InputItem
            autoFocus
            title='Password'
            name='password'
            type='password'
            value={userData.password}
            onInputChange={onInputChange}
          />
          <span>
            <a href='#' className='link'>
              Forgot Password?
            </a>
          </span>
          <button type='submit' className='btn btn-submit'>
            Login
          </button>
          <span className='no-account-link'>
            Don't have an account?
            <Link to='../signup' className='link ml-1-2'>
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
