import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PasswordCheck } from './passwordCheck';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import InputItem from '../inputItem';
import Loading from '../../common/loading/loading';
import { Alert } from '../../alert/alert';
import {
  checkStrLength,
  checkStrNum,
  checkStrSym,
  checkStrUpper,
} from '../../../util/validation/validatePassword';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStatus = useSelector((state) => state.user.status);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [password2, setPassword2] = useState('');
  const [isPwordLong, setPwordLong] = useState(false);
  const [pwordHasNum, setPwordHasNum] = useState(false);
  const [pwordHasSym, setPwordHasSym] = useState(false);
  const [pwordHasUpper, setPwordHasUpper] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const onInputChange = (e) => {
    if (e.target.name === 'password2') {
      setPassword2(e.target.value);
    } else if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.password !== password2) {
      setPasswordMatch(false);
      setPassword2('');
    } else {
      setPasswordMatch(true);
      dispatch(registerUser(userData));
    }
  };
  useEffect(() => {
    checkStrLength(userData.password, setPwordLong);
    checkStrNum(userData.password, setPwordHasNum);
    checkStrSym(userData.password, setPwordHasSym);
    checkStrUpper(userData.password, setPwordHasUpper);
  }, [userData.password]);
  useEffect(() => {
    if (userStatus === 'success') {
      navigate('/signup-successful');
      dispatch({ type: 'user/returnToIdle' });
    }
  }, [userStatus, navigate]);
  if (userStatus === 'loading') {
    return (
      <main className='form-container'>
        <Loading />
      </main>
    );
  }
  return (
    <main className='form-container'>
      <form onSubmit={submitHandler} className='form'>
        <h2 className='heading-3 text-center'>Signup</h2>
        {userStatus === 'email_already_exists' && (
          <Alert msg='Email already exists' />
        )}
        {userStatus === 'error' && <Alert msg='Something went wrong' />}
        <div className='form-box'>
          <InputItem
            autoFocus
            title='First Name'
            name='firstName'
            type='text'
            value={userData.firstName}
            onInputChange={onInputChange}
            required
          />
          <InputItem
            title='Last Name'
            name='lastName'
            type='text'
            value={userData.lastName}
            onInputChange={onInputChange}
            required
          />
          <InputItem
            title='Email'
            name='email'
            type='email'
            value={userData.email}
            onInputChange={onInputChange}
            required
          />
          <PasswordCheck
            isPwordLong={isPwordLong}
            pwordHasNum={pwordHasNum}
            pwordHasSym={pwordHasSym}
            pwordHasUpper={pwordHasUpper}
          />
          <InputItem
            title='Password'
            name='password'
            type='password'
            value={userData.password}
            onInputChange={onInputChange}
            required
          />
          <InputItem
            title='Confirm Password'
            name='password2'
            type='password'
            value={password2}
            onInputChange={onInputChange}
            required
          />
        </div>
        {passwordMatch || <Alert msg='passwords do not match' />}
        <button type='submit' className='btn btn-submit' disabled={false}>
          Signup
        </button>
        <span className='no-account-link'>
          Already have an account?
          <Link to='../login' className='link ml-1-2'>
            Log In
          </Link>
        </span>
      </form>
    </main>
  );
};

export default SignupForm;
