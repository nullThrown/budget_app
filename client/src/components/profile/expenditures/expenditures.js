import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';

const Expenditures = ({data}) => {

  return (
    <section className='card expenditures-box'>
      <Header />
      <main className='main'>
        <Table data={data}/>
      </main>
    </section>
  );
};

export default Expenditures;
