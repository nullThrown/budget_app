import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';

const Expenditures = ({ data }) => {
  return (
    <div className='card expenditures-box'>
      <section className='exp-box'>
        <Header />
        <main className='main'>
          <Table data={data} />
        </main>
      </section>
    </div>
  );
};

export default Expenditures;
