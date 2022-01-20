import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/common/loading/loading';
import ServerError from '../components/alert/serverError';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Recurring from '../components/profile/recurring/recurring';
import { categories, barData, doughnutData } from '../data/currentMonth';

const Home = () => {
  const loadingStatus = useSelector((state) => state.finance.status);

  if (loadingStatus === 'loading') {
    return (
      <div className='profile__error-placement'>
        <Loading className='profile__error-placement' />
      </div>
    );
  }
  if (loadingStatus === 'failed') {
    return (
      <div className='profile__error-placement'>
        <ServerError className='profile__error-placement' />
      </div>
    );
  }
  return (
    <>
      <Overview doughnutData={doughnutData} />
      <Recurring />
      <BudgetGraph data={barData} categories={categories} />
      <Expenditures />
    </>
  );
};

export default Home;
