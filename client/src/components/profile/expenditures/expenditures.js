import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';

const Expenditures = () => {
  return (
    <section className='card expenditures-box'>
      <Header />
      <main className='main'>
        <Table />
      </main>
    </section>
  );
};

export default Expenditures;
