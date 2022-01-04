import React from 'react';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Banner from '../components/profile/banner/banner';
import Nav from '../components/nav/nav';
import Recurring from '../components/profile/recurring/recurring';
import { categories, barData, doughnutData } from '../data/currentMonth';
const Home = () => {
  return (
    <div>
      <Nav />
      <main className='main-container'>
        <Header />
        <Banner />
        <Overview doughnut={doughnutData} />
        <Recurring />
        {/* import barData as means of placing graph config outside of component file */}
        <BudgetGraph data={barData} categories={categories} />
        <Expenditures />
      </main>
    </div>
  );
};

export default Home;
