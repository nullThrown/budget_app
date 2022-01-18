import React from 'react';
import { GrRefresh } from 'react-icons/gr';
import './serverError.css';

const ServerError = () => {
  const handleRefresh = () => window.location.reload();

  return (
    <figure className='server-error'>
      <figcaption className='server-error__title'>
        Something went wrong :( try again
      </figcaption>
      <button className='btn server-error__btn' onClick={handleRefresh}>
        <GrRefresh className='server-error__refresh' />
      </button>
    </figure>
  );
};

export default ServerError;
