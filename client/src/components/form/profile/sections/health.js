import React from 'react';
import InputItem from '../../inputItem';
const Health = ({ data, onInputChange }) => {
  const { healthInsurance, healthFitness } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Health</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Insurance'
          name='healthInsurance'
          type='number'
          value={healthInsurance}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <InputItem
          title='Fitness'
          name='healthFitness'
          type='number'
          value={healthFitness}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
      </section>
    </>
  );
};
export default Health;
