import React, { useState } from 'react';
import '../forms.css';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../../../features/profile/middleware';
import defaultObjectProperties from '../../../util/defaultObjProp';
import Housing from './sections/housing';
import Salary from './sections/salaray';
import Vehicle from './sections/vehicle';
import Utilities from './sections/utilities';
import ChildCare from './sections/childcare';
import Health from './sections/health';
import Debt from './sections/debt';
import Retirement from './sections/retirement';
import ProgressBar from './progressBar';
import Loading from '../../common/loading/loading';
import Success from '../../alert/success';
import Description from './sections/description';
const Profile = () => {
  const dispatch = useDispatch();
  const profileStatus = useSelector((state) => state.profile.status);

  const [profileData, setProfileData] = useState({
    paycheckAmount: null,
    housingPayment: null,
    housingInsurance: null,
    vehicleLoan: null,
    vehicleInsurance: null,
    cellPlan: null,
    cellLoan: null,
    internetPlan: null,
    childcareTuition: null,
    childcareDaycare: null,
    healthInsurance: null,
    healthFitness: null,
    debtStudent: null,
    debtCredit: null,
    retirementIra: null,
    retirementBrokerage: null,
    retirement401k: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

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
    defaultObjectProperties(profileData, 0);
    e.preventDefault();
    dispatch(createProfile(profileData));
  };

  if (profileStatus === 'loading') {
    return (
      <main className='form-container'>
        <Loading />
      </main>
    );
  }
  if (profileStatus === 'success') {
    return (
      <main className='form-container'>
        <Success
          text='Profile created'
          actionCreator={{ type: 'profile/returnToIdle' }}
          redirectPath='/profile/home'
        />
      </main>
    );
  }
  return (
    <main className='form-container'>
      <form className='form'>
        {currentPage === 1 && <Description onInputChange={onInputChange} />}
        {currentPage === 2 && (
          <Salary data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 3 && (
          <Housing data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 4 && (
          <Vehicle data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 5 && (
          <Utilities data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 6 && (
          <Health data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 7 && (
          <ChildCare data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 8 && (
          <Debt data={profileData} onInputChange={onInputChange} />
        )}
        {currentPage === 9 && (
          <Retirement
            data={profileData}
            onInputChange={onInputChange}
            profileStatus={profileStatus}
          />
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
            disabled={currentPage >= 9}
            onClick={onPageChange}>
            Next
          </button>
        </div>
        {currentPage === 9 && (
          <button type='submit' className='btn btn-submit' onClick={onSubmit}>
            Submit
          </button>
        )}
      </form>
    </main>
  );
};

export default Profile;
