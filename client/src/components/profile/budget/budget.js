import { useState, useEffect } from 'react';
import './budget.css';

export const Budget = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      ...Date,
      takeHomePay: 3600,
      necessity: 1800,
      indulgent: 300,
      remaining: 1500,
    });
  });
  const { takeHomePay, necessity, indulgent, remaining } = data;
  return (
    <section className='budget'>
      <h3 className='budget-title heading-3'>Budget</h3>
      <div className='budget-box'>
        <BudgetItem
          title={'Take-home pay'}
          amountClass={'item-amount--green'}
          amount={takeHomePay}
        />
        <BudgetItem
          title={'Necessity spent'}
          amountClass={'item-amount--red'}
          amount={necessity}
        />
        <BudgetItem
          title={'Indulgent spent'}
          amountClass={'item-amount--red'}
          amount={indulgent}
        />
        <BudgetItem
          title={'Remaining funds'}
          amountClass={'item-amount--green'}
          amount={remaining}
        />
      </div>
    </section>
  );
};

//choose better name than item
const BudgetItem = (props) => {
  const { title, amountClass, amount } = props;
  return (
    <div className='budget-item'>
      <p className='item-title'>{title}</p>
      <span className={amountClass}>$ {amount}</span>
    </div>
  );
};
