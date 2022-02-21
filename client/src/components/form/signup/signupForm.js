import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordCheck } from './passwordCheck';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/auth/userSlice';
import InputItem from '../inputItem';
import Loading from '../../common/loading/loading';
import { Alert } from '../../alert/alert';
import Success from '../../alert/success';
import useValidatePassword from '../../../hooks/useValidatePword';

const SignupForm = () => {
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.user.status);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const validators = useValidatePassword(userData.password);
  const [validationFailed, setValidationFailed] = useState(false);

  const onInputChange = (e) => {
    if (e.target.name === 'password2') {
      setPassword2(e.target.value);
    } else if (e.target.name)
      setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { isLong, hasNumber, hasSymbol, hasUpper } = validators;

    // error handler
    //  error caught -- prevent submit & display corresponding error msg
    // no error caught -- submit form
    if (
      userData.password !== password2 ||
      !isLong ||
      !hasNumber ||
      !hasSymbol ||
      !hasUpper
    ) {
      // if/else determine if 'no match' error message is displayed
      if (userData.password !== password2) {
        setPasswordMatch(false);
        setPassword2('');
      } else {
        setPasswordMatch(true);
      }
      // if/else determine if 'check validators' error message is displayed
      if (!isLong || !hasNumber || !hasSymbol || !hasUpper) {
        setValidationFailed(true);
      } else {
        setValidationFailed(false);
      }
      // all checks pass
    } else {
      setValidationFailed(false);
      setPasswordMatch(true);
      dispatch(registerUser(userData));
    }
  };

  if (userStatus === 'loading') {
    return (
      <main className='form-container'>
        <Loading />
      </main>
    );
  }
  if (userStatus === 'success') {
    return (
      <main className='form-container'>
        <Success
          text='Account Created!'
          actionCreator={{ type: 'user/returnToIdle' }}
          redirectPath='/create-profile'
        />
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
            isPwordLong={validators.isLong}
            pwordHasNum={validators.hasNumber}
            pwordHasSym={validators.hasSymbol}
            pwordHasUpper={validators.hasUpper}
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
        {validationFailed && (
          <Alert msg='Oops! Check the password requirements' />
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
