import React from 'react';
import './recurring.css';
import { useSelector } from 'react-redux';

const Recurring = () => {
  const selectPayments = (state) => state.profile.recurringPayments;
  const payments = useSelector(selectPayments);
  return (
    <section className='card recurring'>
      <h2 className='heading-4 text-center'>Recurring</h2>
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
