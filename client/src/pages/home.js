import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/loading/loading';
import ServerError from '../components/alert/serverError';
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
    const date = new Date();
    dispatch(getFinancialData(date.getFullYear(), date.getMonth()));
  }, []);

  // if (loadingStatus === 'loading') {
  //   return (
  //     <main className='center-container'>
  //       <Loading />
  //     </main>
  //   );
  // }
  // if (loadingStatus === 'failed') {
  //   return (
  //     <main className='center-container'>
  //       <ServerError />
  //     </main>
  //   );
  // }
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
