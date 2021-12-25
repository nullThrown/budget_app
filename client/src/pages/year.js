import React from 'react';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import Overview from '../components/profile/overview/overview';
import Banner from '../components/profile/banner/banner';
import { budgetData, categories, barData, expData } from '../data/year';

const Home = () => {
  return (
    <main className='main-container'>
      <Header />
      <Banner />
      <BudgetGraph data={budgetData} />
      <Overview data={barData} categories={categories} />
      <Expenditures data={expData} />
    </main>
  );
};

export default Home;
