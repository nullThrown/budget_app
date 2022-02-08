import React from 'react';
import InputItem from '../../inputItem';
const HousingSect = ({ data, onInputChange }) => {
  const { housingPayment, housingInsurance } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Housing</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Mortgage/rent'
          name='housingPayment'
          type='number'
          value={housingPayment}
          onInputChange={onInputChange}
          placeHolder={0}
        />
        <InputItem
          title='Insurance'
          name='housingInsurance'
          type='number'
          value={housingInsurance}
          onInputChange={onInputChange}
          placeHolder={0}
        />
      </section>
    </>
  );
};
export default HousingSect;
