import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from '../features/profile/profileSlice';
import { getExpByCurrentMonth } from '../features/expenditures/expendituresSlice';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Banner from '../components/profile/banner/banner';
import Nav from '../components/nav/nav';
import Recurring from '../components/profile/recurring/recurring';
import { categories, barData, doughnutData } from '../data/currentMonth';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getExpByCurrentMonth());
  }, []);

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
