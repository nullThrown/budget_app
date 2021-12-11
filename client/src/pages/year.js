import React from 'react';
import Budget from '../components/profile/budget/budget';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import Bar from '../components/profile/monthlySpecifics/bar';
import Banner from '../components/profile/banner/banner';
import {budgetData, categories, barData, expData} from '../data/year'

const Home = () => {
  return (
    <main className='main-container'>
     <Header />
      <Banner />
      <Budget data={budgetData} />
      <Bar data={barData} categories={categories}/>
      <Expenditures data={expData}/>
    </main>
  );
};

export default Home;
