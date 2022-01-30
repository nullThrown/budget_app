import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';
import { useSelector } from 'react-redux';

const Expenditures = ({ openModal }) => {
  const expenses = useSelector((state) => state.expenses.data);

  return (
    <>
      <div className='card expenditures-box'>
        <section className='exp-box'>
          <Header />
          <main className='main'>
            <Table expenses={expenses} openModal={openModal} />
          </main>
        </section>
      </div>
    </>
  );
};

export default Expenditures;
