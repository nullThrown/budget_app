import React from 'react';
import './banner.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner-box'>
        <button className='btn arrow arrow-right'>
          <AiOutlineArrowLeft className='' />
        </button>
        <span className='heading-4 banner-date'>January 2021</span>

        <button className='btn arrow arrow-left'>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
