import React from 'react';
import InputItem from '../../inputItem';
const SalarySect = ({ data, onInputChange }) => {
  const { paycheckAmount } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Salary</h2>
      <section className='form-box'>
        <p className='mb-1-2 text-bold'>Salary is after-tax amount</p>
        <InputItem
          autoFocus
          title='net salary'
          name='paycheckAmount'
          type='number'
          value={paycheckAmount}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <label className='text-default' htmlFor='pay-period'>
          pay period
        </label>
        <br />
        <select className='text-default' name='pay-period' id='pay-period'>
          <option value='weekly'>Weekly</option>
          <option value='bi-weekly'>Bi-weekly</option>
          <option value='monthly'>Monthly</option>
        </select>
      </section>
    </>
  );
};
export default SalarySect;
