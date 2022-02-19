import React, { useEffect, useState } from 'react';
import './recurring.css';
import { useSelector, useDispatch } from 'react-redux';
import PaymentItem from './paymentItem';
import {
  createRecurring,
  editRecurring,
  deleteRecurring,
} from '../../../features/recurring/middleware';

const Recurring = () => {
  const dispatch = useDispatch();
  const [numOfPages, setNumOfPages] = useState(null);
  const [pagesArray, setPagesArray] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoriesPerPage, setCategoriesPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const payments = useSelector((state) => state.recurring.data);
  const numOfCategories = useSelector((state) => state.recurring.data.length);

  const handlePageChange = (e) => {};
  useEffect(() => {
    console.log('component mounted');
  }, [currentPage]);
  useEffect(() => {
    setNumOfPages(Math.ceil(numOfCategories / categoriesPerPage));
  }, [numOfCategories]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < numOfPages; i++) {
      arr.push(i);
    }
    setPagesArray(arr);
  }, [numOfPages]);

  useEffect(() => {
    const endIndex = currentPage * categoriesPerPage;
    const startIndex = endIndex - categoriesPerPage;
    setCurrentCategories(() => {
      return payments.slice(startIndex, endIndex);
    });
  }, [currentPage, payments]);
  useEffect(() => {
    console.log(currentCategories);
  }, [currentCategories]);

  return (
    <section className='card recurring'>
      <h2 className='heading-4 text-center'>Recurring</h2>
      <div className='card-main-content-box'>
        <div className='payment__box'>
          {currentCategories.map((cat, _id) => {
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
