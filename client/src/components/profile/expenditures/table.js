import { useState } from 'react';
import TableCell from './tableCell';
import ExpenseModal from '../../common/modal/expense/modal';
export const Table = ({ expenses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseItemId, setExpenseItemId] = useState('');

  const openModal = (id) => {
    setExpenseItemId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <ExpenseModal
        isOpen={isOpen}
        closeModal={closeModal}
        expenseId={expenseItemId}
      />
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
    </>
  );
};
