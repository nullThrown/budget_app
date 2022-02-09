import React from 'react';

const ProgressBar = ({ currentPage }) => {
  // map this from an array of eight items
  // no reason to hard code this
  return (
    <div className='progress-bar'>
      <span className='progress-sect--complete'></span>
      <span
        className={`progress-sect--${
          currentPage >= 2 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 3 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 4 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 5 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 6 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 7 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 8 ? 'complete' : 'incomplete'
        }`}></span>
      <span
        className={`progress-sect--${
          currentPage >= 9 ? 'complete' : 'incomplete'
        }`}></span>
    </div>
  );
};
export default ProgressBar;
