import React, { useState, useEffect } from 'react';
import './banner.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import months from '../../../data/months';
import { useDispatch } from 'react-redux';
import { getFinancialData } from '../../../features/finance/financeReducer';

const date = new Date();
const currentMonthNum = date.getMonth();
const currentYear = date.getFullYear();

const Banner = () => {
  const dispatch = useDispatch();

  const [monthStr, setMonthStr] = useState(null);
  const [monthNum, setMonthNum] = useState(currentMonthNum);
  const [year, setYear] = useState(currentYear);
  const [isCurrentDate, setIsCurrentDate] = useState(true);

  const onPrevClick = () => {
    if (monthNum === 0) {
      setMonthNum(11);
      setYear(year - 1);
    } else {
      setMonthNum(monthNum - 1);
    }
  };

  const onNextClick = () => {
    if (monthNum === currentMonthNum && year === currentYear) {
      return;
    } else if (monthNum === 11) {
      setMonthNum(0);
      setYear(year + 1);
    } else {
      setMonthNum(monthNum + 1);
    }
  };

  useEffect(() => {
    setMonthStr(months[monthNum]);
  }, [monthNum]);

  useEffect(() => {
    if (monthNum === currentMonthNum && year === currentYear) {
      setIsCurrentDate(true);
    } else {
      setIsCurrentDate(false);
    }
  }, [monthNum, year]);

  useEffect(() => {
    dispatch(getFinancialData(year, monthNum));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthNum, year]);
  return (
    <div className='banner'>
      <div className='banner-box'>
        <button
          type='button'
          className='btn arrow arrow-left'
          onClick={onPrevClick}>
          <AiOutlineArrowLeft />
        </button>
        <span className='heading-4 banner-date'>
          {monthStr} {year}
        </span>

        <button
          type='button'
          className='btn arrow arrow-right'
          onClick={onNextClick}
          disabled={isCurrentDate}>
          <AiOutlineArrowRight />
        </button>
      </div>
      {/* <button type='button' className='btn banner__add-new'>Add New<GrAddCircle className='add-new-btn'/></button> */}
      <button type='button' className='btn banner__add-new'>
        Add New
        <IoMdAddCircleOutline className='add-new-btn' />
      </button>
    </div>
  );
};

export default Banner;
