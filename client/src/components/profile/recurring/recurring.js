/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './recurring.css';
import { useSelector, useDispatch } from 'react-redux';
import PaymentItem from './paymentItem';
import usePagination from '../../../hooks/usePagination';
import {
  createRecurring,
  editRecurring,
  deleteRecurring,
} from '../../../features/recurring/middleware';

const Recurring = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const payments = useSelector((state) => state.recurring.data);

  const { currentItems, pagesArray } = usePagination(payments, 3, currentPage);
  return (
    <section className='card recurring'>
      <h2 className='heading-4 text-center'>Recurring</h2>
      <div className='card-main-content-box recurring__content'>
        <div className='payment__box'>
          {currentItems.map((cat, _id) => {
            const { category, payments } = cat;
            return (
              <PaymentItem key={_id} category={category} payments={payments} />
            );
          })}
        </div>
        <div className='payment__pages'>
          {pagesArray.map((page, i) => {
            return (
              <button
                type='button'
                key={i}
                className='btn link mr-1-2'
                onClick={() => setCurrentPage(page + 1)}>
                {page + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Recurring;
