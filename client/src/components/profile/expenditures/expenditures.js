import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';
import { useSelector, useDispatch } from 'react-redux';

const Expenditures = ({ data }) => {
  const selectExpenditures = (state) => state.expenditures;
  const expenditures = useSelector(selectExpenditures);
  return (
    <div className='card expenditures-box'>
      <section className='exp-box'>
        <Header />
        <main className='main'>
          <Table data={expenditures} />
        </main>
      </section>
    </div>
  );
};

export default Expenditures;
