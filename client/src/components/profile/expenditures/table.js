import { useState } from 'react';
import TableCell from './tableCell';
export const Table = ({ expenses, openModal }) => {
  return (
    <table>
      <thead>
        <tr className='header-row'>
          <th className='table-cell-date'>Title</th>
          <th className='table-cell-date'>Date</th>
          <th className='table-cell-desc'>Description</th>
          <th className='table-cell-category'>category</th>
          <th className='table-cell-necessity'></th>
          <th className='table-cell-amount'>amount</th>
          <th className='table-cell-edit'></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => {
          const newDate = new Date(exp.date);
          const readableDate = newDate.toLocaleDateString('en-US');

          return (
            <TableCell exp={exp} date={readableDate} openModal={openModal} />
          );
        })}
      </tbody>
    </table>
  );
};
