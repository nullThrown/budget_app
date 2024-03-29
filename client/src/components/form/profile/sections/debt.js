import React from 'react';
import InputItem from '../../inputItem';
const Debt = ({ data, onInputChange }) => {
  const { debtStudent, debtCredit } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Debt</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Student'
          name='debtStudent'
          type='number'
          value={debtStudent}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <InputItem
          title='Credit'
          name='debtCredit'
          type='number'
          value={debtCredit}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
      </section>
    </>
  );
};
export default Debt;
