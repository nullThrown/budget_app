import { useState } from 'react';

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
            <>
              <tr key={exp._id} className='table-row-data'>
                <td className='table-cell-date'>{exp.title}</td>
                <td className='table-cell-date'>{readableDate}</td>
                <td className='table-cell-desc'>{exp.description}</td>
                <td className='table-cell-category'>{exp.category}</td>
                <td className='table-cell-necessity'>
                  <span
                    className={
                      'text-sm ' +
                      (exp.necessity ? 'text-bg-green' : 'text-bg-red')
                    }>
                    {exp.necessity ? ' necessity' : ' indulgent'}
                  </span>
                </td>

                <td className='table-cell-amount'>${exp.amount}</td>
                <td className='table-cell-edit'>
                  <button
                    className='btn link'
                    onClick={() => openModal(exp._id)}>
                    edit
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
