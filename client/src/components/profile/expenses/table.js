import { useState } from 'react';
import TableCell from './tableCell';
import ExpenseModal from '../../common/modal/sections/editExpense';
import usePagination from '../../../hooks/usePagination';
const Table = ({ expenses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseItemId, setExpenseItemId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const openModal = (id) => {
    setExpenseItemId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const { currentItems, pagesArray } = usePagination(expenses, 5, currentPage);

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
          {currentItems.map((exp) => {
            const newDate = new Date(exp.date);
            const readableDate = newDate.toLocaleDateString('en-US');

            return (
              <>
                <TableCell
                  key={exp._id}
                  exp={exp}
                  date={readableDate}
                  openModal={openModal}
                />
              </>
            );
          })}
        </tbody>
        <div className='payment__pages'>
          {pagesArray.map((page, i) => {
            return (
              <button
                type='button'
                key={i}
                className='btn link mr-1-2'
                onClick={() => setCurrentPage(page + 1)}>
                {page + 1}
              </button>
            );
          })}
        </div>
      </table>
    </>
  );
};

export default Table;
