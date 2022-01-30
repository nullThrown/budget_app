import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Success = ({ text, actionCreator, closeModal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const clearSuccess = setTimeout(() => {
      dispatch(actionCreator);
      closeModal();
    }, 1500);
    return () => clearTimeout(clearSuccess);
  });
  return (
    <div className='mt-2 flex-col align-center'>
      <p className='heading-5'>{text}</p>
      <AiOutlineCheckCircle
        style={{ color: 'var(--green-5)', fontSize: '5rem', marginTop: '.2em' }}
      />
    </div>
  );
};

export default Success;
