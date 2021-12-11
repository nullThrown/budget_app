import React from 'react';
import './banner.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {IoMdAddCircleOutline} from 'react-icons/io'
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
      {/* <button type='button' className='btn banner__add-new'>Add New<GrAddCircle className='add-new-btn'/></button> */}
      <button type='button' className='btn banner__add-new'>Add New<IoMdAddCircleOutline className='add-new-btn'/></button>
    </div>
  );
};

export default Banner;
