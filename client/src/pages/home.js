import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../features/profile/profileSlice';
import { getExpByCurrentMonth } from '../features/expenditures/expendituresSlice';
import Loading from '../components/common/loading/loading';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Banner from '../components/profile/banner/banner';
import Nav from '../components/nav/nav';
import Recurring from '../components/profile/recurring/recurring';
import { categories, barData, doughnutData } from '../data/currentMonth';
import { getFinancialData } from '../features/finance/financeReducer';
const Home = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.finance.status);

  useEffect(() => {
    dispatch(getFinancialData());
  }, []);

  if (loadingStatus === 'loading') {
    return (
      <main className='center-container'>
        <Loading />;
      </main>
    );
  }
  if (loadingStatus === 'failed') {
    return (
      <main className='main-container'>
        <p>Something went wrong :( ... please try again </p>
      </main>
    );
  }
  return (
    <div>
      <Nav />
      <main className='main-container'>
        <Header />
        <Banner />
        <Overview doughnutData={doughnutData} />
        <Recurring />
        {/* import barData as means of placing graph config outside of component file */}
        <BudgetGraph data={barData} categories={categories} />
        <Expenditures />
      </main>
    </div>
  );
};

export default Home;
