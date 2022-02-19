import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../../features/expenses/middleware';

const TableCell = ({ exp, date, openModal }) => {
  const dispatch = useDispatch();

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <tr key={exp._id} className='table-row-data'>
      <td className='table-cell-date'>{exp.title}</td>
      <td className='table-cell-date'>{date}</td>
      <td className='table-cell-desc'>{exp.description}</td>
      <td className='table-cell-category'>{exp.category}</td>
      <td className='table-cell-necessity'>
        <span
          className={
            'text-sm ' + (exp.necessity ? 'text-bg-green' : 'text-bg-red')
          }>
          {exp.necessity ? ' necessity' : ' indulgent'}
        </span>
      </td>

      <td className='table-cell-amount'>${exp.amount}</td>
      <td className='table-cell-edit'>
        <button className='btn link' onClick={() => openModal(exp._id)}>
          Edit
        </button>
      </td>
      <td>
        <button
          className='btn btn--delete-sm flex'
          onClick={() => handleDeleteExpense(exp._id)}>
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default TableCell;
