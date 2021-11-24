import { useState, useEffect } from 'react';
import { Alert } from '../../alert/alert';
import { PasswordCheck } from './passwordCheck';
import {
  checkPasswordLength,
  checkPasswordNum,
  checkPasswordSym,
  checkPasswordUpper,
} from '../../../util/validation/validatePassword';

// validation import functions do not have access to state variables
// solution? place callback inside validation functions and then insert state change functions when validate fn are called
const SignupForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isPwordLong, setPwordLong] = useState(false);
  const [pwordHasNum, setPwordHasNum] = useState(false);
  const [pwordHasSym, setPwordHasSym] = useState(false);
  const [pwordHasUpper, setPwordHasUpper] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const onChangeHandler = (e) => {
    if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      setPasswordMatch(false);
      setUserData({ ...userData, password2: '' });
    } else {
      console.log(userData);
    }
  };
  useEffect(() => {
    checkPasswordLength(userData.password, setPwordLong);
    checkPasswordNum(userData.password, setPwordHasNum);
    checkPasswordSym(userData.password, setPwordHasSym);
    checkPasswordUpper(userData.password, setPwordHasUpper);
  }, [userData.password]);
  return (
    <form onSubmit={submitHandler} className='form'>
      <h2>Signup</h2>
      <label htmlFor='firstName'>First Name</label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        value={userData.firstName}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <label htmlFor='lastName'>Last Name</label>
      <input
        type='text'
        id='lastName'
        name='lastName'
        value={userData.lastName}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <label htmlFor='firstName'>email</label>
      <input
        type='email'
        id='email'
        name='email'
        value={userData.email}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />

      <PasswordCheck
        isPwordLong={isPwordLong}
        pwordHasNum={pwordHasNum}
        pwordHasSym={pwordHasSym}
        pwordHasUpper={pwordHasUpper}
      />
      <label htmlFor='password'>password</label>
      <input
        type='password'
        id='password'
        name='password'
        value={userData.password}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <label htmlFor='password2'>Confirm Password</label>
      <input
        type='password'
        id='password2'
        name='password2'
        value={userData.password2}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />
      {passwordMatch || (
        <Alert msg={'passwords do not match'} isSuccess={false} />
      )}
      <button type='submit' className='btn btn-submit' disabled={false}>
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
