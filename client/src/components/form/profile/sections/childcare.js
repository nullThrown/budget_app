import React from 'react';
import InputItem from '../../inputItem';
const ChildCare = ({ data, onInputChange }) => {
  const { childcareTuition, childcareDaycare } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>ChildCare</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='School Tuition'
          name='childcareTuition'
          type='number'
          value={childcareTuition}
          onInputChange={onInputChange}
        />
        <InputItem
          title='Daycare'
          name='childcareDaycare'
          type='number'
          value={childcareDaycare}
          onInputChange={onInputChange}
        />
      </section>
    </>
  );
};

export default ChildCare;
