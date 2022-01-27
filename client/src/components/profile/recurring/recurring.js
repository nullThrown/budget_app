import React from 'react';
import './recurring.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  createRecurring,
  editRecurring,
  deleteRecurring,
} from '../../../features/middleware/recurring';
const Recurring = () => {
  const dispatch = useDispatch();
  const selectPayments = (state) => state.finance.recurringPayments;
  const payments = useSelector(selectPayments);

  const addNew = () => {
    dispatch(
      deleteRecurring({
        id: '61edf7401a7da730bc60837a',
        category: 'housing',
      })
    );
  };

  return (
    <section className='card recurring'>
      <h2 className='heading-4 text-center'>Recurring</h2>
      <button type='button' className='btn btn-submit' onClick={addNew}>
        Add New
      </button>
      {payments.map((cat, _id) => {
        const { category, payments } = cat;
        return (
          <PaymentItem key={_id} category={category} payments={payments} />
        );
      })}
    </section>
  );
};

const PaymentItem = ({ category, payments }) => {
  return (
    <div className='payment__category'>
      <p className=' payment__title text-sm'>{category}</p>
      {payments.map((expense) => {
        const { amount, name, _id } = expense;
        return (
          <div key={_id} className='flex payment__item'>
            <p className='payment__item-title text-sm'>{name}</p>
            <span className='payment__item-amt   text-sm'>$ {amount}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Recurring;
