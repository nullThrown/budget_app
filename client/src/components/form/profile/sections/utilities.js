import React from 'react';
import InputItem from '../inputItem';
const Utilities = ({ data, onInputChange }) => {
  const { cellPlan, cellLoan, internetPlan } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Utilities</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Cell Plan'
          name='cellPlan'
          type='number'
          value={cellPlan}
          onInputChange={onInputChange}
        />
        <InputItem
          title='Cell Loan'
          name='cellLoan'
          type='number'
          value={cellLoan}
          onInputChange={onInputChange}
        />
        <InputItem
          title='Internet Plan'
          name='internetPlan'
          type='number'
          value={internetPlan}
          onInputChange={onInputChange}
        />
      </section>
    </>
  );
};

export default Utilities;
