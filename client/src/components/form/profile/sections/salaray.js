import React from 'react';
import InputItem from '../../inputItem';
const SalarySect = ({ data, onInputChange }) => {
  const { paycheckAmount } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Salary</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='base salary'
          name='paycheckAmount'
          type='number'
          value={paycheckAmount}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
      </section>
    </>
  );
};
export default SalarySect;
