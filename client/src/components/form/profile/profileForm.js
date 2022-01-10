import React, { useState } from 'react';
import '../forms.css';
import Housing from './sections/housing';
import Salary from './sections/salaray';
import Vehicle from './sections/vehicle';
import Utilities from './sections/utilities';
import ChildCare from './sections/childcare';
import Health from './sections/health';
import Debt from './sections/debt';
import Retirement from './sections/retirement';
import ProgressBar from './progressBar';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    paycheckAmount: 0,
    housingPayment: 0,
    housingInsurance: 0,
    vehicleLoan: 0,
    vehicleInsurance: 0,
    cellPlan: 0,
    cellLoan: 0,
    internetPlan: 0,
    childcareTuition: 0,
    childcareDaycare: 0,
    healthInsurance: 0,
    healthFitness: 0,
    debtStudent: 0,
    debtCredit: 0,
    retirementIra: 0,
    retirementBrokerage: 0,
    retirement401k: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // find smilga project example that has logic that limits a state within a range (e.g., 1-6)
  const onInputChange = (e) => {
    if (e.target.name) {
      setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }
  };

  const onPageChange = (e) => {
    if (e.target.name === 'prev') {
      setCurrentPage(currentPage - 1);
    } else if (e.target.name === 'next') {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
  };

  return (
    <main className='form-container'>
      <form className='form'>
        {currentPage === 1 && (
          <Salary data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 2 && (
          <Housing data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 3 && (
          <Vehicle data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 4 && (
          <Utilities data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 5 && (
          <Health data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 6 && (
          <ChildCare data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 7 && (
          <Debt data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 8 && (
          <Retirement data={profileData} onInputChange={onInputChange} />
        )}
        <ProgressBar currentPage={currentPage} />
        <div className='flex justify-center mt-1'>
          <button
            type='button'
            className='btn btn-page-select mr-1'
            name='prev'
            disabled={currentPage <= 1}
            onClick={onPageChange}>
            Prev
          </button>
          <button
            type='button'
            className='btn btn-page-select'
            name='next'
            disabled={currentPage >= 8}
            onClick={onPageChange}>
            Next
          </button>
        </div>
        {currentPage === 8 && (
          <button type='submit' className='btn btn-submit' onClick={onSubmit}>
            Submit
          </button>
        )}
      </form>
    </main>
  );
};

export default Profile;

// iterates over an objects own properties and changes all null values to 0
// Object.keys(obj).forEach((key) => {
//   if (obj[key] === null) {
//     obj[key] = 0;
//   }
// });
