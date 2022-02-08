import React from 'react';
import InputItem from '../../inputItem';
const VehicleSect = ({ data, onInputChange }) => {
  const { vehicleLoan, vehicleInsurance } = data;
  return (
    <>
      <h2 className='heading-3 text-center'>Vehicle</h2>
      <section className='form-box'>
        <InputItem
          autoFocus
          title='Loan'
          name='vehicleLoan'
          type='number'
          value={vehicleLoan}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
        <InputItem
          title='Insurance'
          name='vehicleInsurance'
          type='number'
          value={vehicleInsurance}
          onInputChange={onInputChange}
          placeHolder={0}
          required
        />
      </section>
    </>
  );
};
export default VehicleSect;
