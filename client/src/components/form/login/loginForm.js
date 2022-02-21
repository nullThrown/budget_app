import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../forms.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import InputItem from '../inputItem';
import { Alert } from '../../alert/alert';
import Loading from '../../common/loading/loading';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStatus = useSelector((state) => state.user.status);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (userStatus === 'success') {
      navigate('/profile/home');
      dispatch({ type: 'user/returnToIdle' });
    }
  }, [userStatus, navigate, dispatch]);

  if (userStatus === 'loading') {
    return (
      <main className='form-container'>
        <Loading />
      </main>
    );
  }
  return (
    <main className='form-container'>
      <form className='form' onSubmit={(e) => submitHandler(e)}>
        <h2 className='heading-3 text-center'>Login</h2>
        {userStatus === 'invalid_credentials' && (
          <Alert msg={'Invalid Credentials '} />
        )}
        {userStatus === 'error' && <Alert msg={'Something went wrong'} />}
        <div className='form-box'>
          <InputItem
            autoFocus
            title='Email'
            name='email'
            type='email'
            value={userData.email}
            onInputChange={onInputChange}
            required
          />
          <InputItem
            title='Password'
            name='password'
            type='password'
            value={userData.password}
            onInputChange={onInputChange}
            required
          />
          <span>
            <p className='btn link' style={{ display: 'inline-block' }}>
              Forgot Password?
            </p>
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
