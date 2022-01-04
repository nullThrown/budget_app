import React from 'react';

const InputItem = ({ title, name, type, value, onInputChange, autoFocus }) => {
  return (
    <div className='input-item'>
      <label htmlFor={name}>{title}</label>
      <input
        autoFocus={autoFocus}
        type={type}
        id={name}
        name={name}
        value={value}
        min={0}
        onChange={onInputChange}
      />
    </div>
  );
};

export default InputItem;
