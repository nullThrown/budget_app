import React from 'react';
import InputItem from '../inputItem';
const Retirement = ({ data, onInputChange }) => {
  const { retirementIra, retirement401k, retirementBrokerage } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Retirement</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Ira'
          name='retirementIra'
          type='number'
          value={retirementIra}
          onInputChange={onInputChange}
        />
        <InputItem
          title='401k'
          name='retirement401k'
          type='number'
          value={retirement401k}
          onInputChange={onInputChange}
        />
        <InputItem
          title='Brokerage'
          name='retirementBrokerage'
          type='number'
          value={retirementBrokerage}
          onInputChange={onInputChange}
        />
      </section>
    </>
  );
};
export default Retirement;
