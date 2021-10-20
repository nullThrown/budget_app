import { useState } from 'react';

import { GiCheckMark } from 'react-icons/gi';
import { MdDangerous } from 'react-icons/md';
export const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isPwordLong, setIsPwordLong] = useState(false);
  const [pwordHasNum, setIsPwordHasNum] = useState(false);
  const [pwordHasSym, setIsPwordHasSym] = useState(true);
  const [pwordHasUpper, setIsPwordHasUpper] = useState(true);

  const onChangeHandler = (e) => {
    if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
  };
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
        type='text'
        id='email'
        name='email'
        value={userData.email}
        className='mb-1'
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <div className='flex-col align-start mb-1'>
        <span
          className={
            'pword-check ' +
            (isPwordLong ? 'pword-check--success' : 'pword-check--danger')
          }>
          {isPwordLong ? <GiCheckMark /> : <MdDangerous />}
          password must be 8 characters long
        </span>
        <span
          className={
            'pword-check ' +
            (pwordHasNum ? 'pword-check--success' : 'pword-check--danger')
          }>
          {pwordHasNum ? <GiCheckMark /> : <MdDangerous />}
          password must contain 1 number
        </span>
        <span
          className={
            'pword-check ' +
            (pwordHasSym ? 'pword-check--success' : 'pword-check--danger')
          }>
          {pwordHasSym ? <GiCheckMark /> : <MdDangerous />}
          password must contain 1 symbol e.g., '!@#$'
        </span>
        <span
          className={
            'pword-check ' +
            (pwordHasUpper ? 'pword-check--success' : 'pword-check--danger')
          }>
          {pwordHasUpper ? <GiCheckMark /> : <MdDangerous />}
          password must have 1 uppercase letter
        </span>
      </div>
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
      <button type='submit' className='btn btn-submit'>
        Signup
      </button>
    </form>
  );
};

const passwordCheck = () => {};
