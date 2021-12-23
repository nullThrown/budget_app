import { map } from 'async';
import React from 'react';
import './recurring.css';

const Recurring = ({ data }) => {
  return (
    <section className='card recurring'>
      <h2 className='heading-4 text-center'>Recurring</h2>
      {data.map((cat, i) => {
        const { title, exp } = cat;
        return <PaymentItem key={i} title={title} exp={exp} />;
      })}
    </section>
  );
};

const PaymentItem = ({ title, exp }) => {
  return (
    <div className='payment__category'>
      <p className=' payment__title text-sm'>{title}</p>
      {exp.map((exp, i) => {
        const { name, amount } = exp;
        return (
          <div key={i} className='flex payment__item'>
            <p className='payment__item-title text-sm'>{name}</p>
            <span className='payment__item-amt   text-sm'>$ {amount}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Recurring;
