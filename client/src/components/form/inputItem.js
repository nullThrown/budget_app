import React from 'react';

const InputItem = ({
  title,
  name,
  type,
  value,
  onInputChange,
  autoFocus,
  required,
  placeHolder,
}) => {
  return (
    <div className='input-item'>
      <label htmlFor={name}>{title}</label>
      <span className='flex'>
        <p className='dollar-symbol'>$</p>
        <input
          autoFocus={autoFocus}
          type={type}
          id={name}
          name={name}
          value={value}
          min={0}
          onChange={onInputChange}
          placeHolder={placeHolder}
          required={required}
        />
      </span>
    </div>
  );
};

export default InputItem;
