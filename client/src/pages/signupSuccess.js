import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupSuccessMsg from '../components/common/signupSuccess';

import React from 'react';

const SignupSuccess = () => {
  const navigate = useNavigate();
  useEffect(() =>
    setTimeout(() => {
      navigate('/create-profile');
    }, 5000)
  );
  return <SignupSuccessMsg />;
};

export default SignupSuccess;
