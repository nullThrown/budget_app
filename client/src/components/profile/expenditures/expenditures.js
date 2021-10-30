import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';
export const Expenditures = () => {
  return (
    <section className='expenditures-box'>
      <Header />
      <main className='main'>
        <Table />
      </main>
    </section>
  );
};

// NOTES
// place nav into category options -- make it look fancy
