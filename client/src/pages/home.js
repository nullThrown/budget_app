import React from 'react';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Banner from '../components/profile/banner/banner';
import Nav from '../components/nav/nav';
import Recurring from '../components/profile/recurring/recurring';
import {
  budgetData,
  categories,
  barData,
  doughnutData,
  expData,
} from '../data/currentMonth';
import recurringData from '../data/recurring';
const Home = () => {
  return (
    <div>
      <Nav />
      <main className='main-container'>
        <Header />
        <Banner />
        <Overview doughnut={doughnutData} budget={budgetData} />
        <Recurring data={recurringData} />
        <BudgetGraph data={barData} categories={categories} />
        <Expenditures data={expData} />
      </main>
    </div>
  );
};

export default Home;
