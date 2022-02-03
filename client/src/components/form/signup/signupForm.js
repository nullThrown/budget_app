import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../alert/alert';
import { PasswordCheck } from './passwordCheck';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import InputItem from '../inputItem';
import {
  checkPasswordLength,
  checkPasswordNum,
  checkPasswordSym,
  checkPasswordUpper,
} from '../../../util/validation/validatePassword';

// validation import functions do not have access to state variables
// solution? place callback inside validation functions and then insert state change functions when validate fn are called
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(registerUser(userData));
      navigate('/signup-successful');
    }
  };
  useEffect(() => {
    checkPasswordLength(userData.password, setPwordLong);
    checkPasswordNum(userData.password, setPwordHasNum);
    checkPasswordSym(userData.password, setPwordHasSym);
    checkPasswordUpper(userData.password, setPwordHasUpper);
  }, [userData.password]);
  return (
    <main className='form-container'>
      <form onSubmit={submitHandler} className='form'>
        <h2 className='heading-3 text-center'>Signup</h2>
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
        {passwordMatch || (
          <Alert msg={'passwords do not match'} isSuccess={false} />
        )}
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
