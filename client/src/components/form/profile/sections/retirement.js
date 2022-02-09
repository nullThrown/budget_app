import React from 'react';
import InputItem from '../../inputItem';
import { Alert } from '../../../alert/alert';

const Retirement = ({ data, onInputChange, profileStatus }) => {
  const { retirementIra, retirement401k, retirementBrokerage } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Retirement</h2>
      {profileStatus === 'error' && <Alert msg='Something went wrong' />}
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Ira'
          name='retirementIra'
          type='number'
          value={retirementIra}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <InputItem
          title='401k'
          name='retirement401k'
          type='number'
          value={retirement401k}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <InputItem
          title='Brokerage'
          name='retirementBrokerage'
          type='number'
          value={retirementBrokerage}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
      </section>
    </>
  );
};
export default Retirement;
