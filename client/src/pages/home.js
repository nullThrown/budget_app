import React from 'react';
import Budget from '../components/profile/budget/budget';
import Expenditures from '../components/profile/expenditures/expenditures';
import Header from '../components/profile/header/header';
import Bar from '../components/profile/monthlySpecifics/bar';
import Banner from '../components/profile/banner/banner';
const Home = () => {
  return (
    <section className='home-container'>
      <Header />
      <Banner />
      <Budget />
      <Bar />
      <Expenditures />
    </section>
  );
};

export default Home;
