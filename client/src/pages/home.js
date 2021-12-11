import React from 'react';
import Budget from '../components/profile/budget/budget';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import Bar from '../components/profile/monthlySpecifics/bar';
import Banner from '../components/profile/banner/banner';
import Nav from '../components/nav/nav';
import Recurring from '../components/profile/recurring/recurring'
import {budgetData, categories, barData, expData} from '../data/currentMonth'
const Home = () => {
  return (
    <main className='main-container'>
      <Nav/>
      <Header />
      <Banner />
      <Budget data={budgetData} />
      <Recurring/>
      <Bar data={barData} categories={categories}/>
      <Expenditures data={expData}/>
    </main>
  );
};

export default Home;
