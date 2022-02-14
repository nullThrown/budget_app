import { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import ModalInstance from '../modal';
import Expense from './addExpense';
import Recurring from './addRecurring';

const AddPayment = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();

  const [currentSect, setCurrentSect] = useState('Add Payment');

  const categories = useSelector((state) => state.profile.categories);

  const onRequestClose = () => {
    setCurrentSect('Add Payment');
    dispatch({ type: 'expenses/returnToIdle' });
    closeModal();
  };

  return (
    <ModalInstance
      isOpen={isOpen}
      closeModal={closeModal}
      onRequestClose={onRequestClose}
      title={currentSect}>
      {currentSect === 'Add Payment' && (
        <div className='modal__add-pay-btn-box'>
          <button
            type='button'
            className='btn mr-1 modal__add-pay-btn'
            onClick={() => setCurrentSect('Add Recurring')}>
            Recurring
          </button>
          <button
            type='button'
            className='btn modal__add-pay-btn'
            onClick={() => setCurrentSect('Add Expense')}>
            One Time
          </button>
        </div>
      )}
      {currentSect === 'Add Recurring' && (
        <Recurring
          categories={categories}
          closeModal={closeModal}
          setCurrentSect={setCurrentSect}
        />
      )}
      {currentSect === 'Add Expense' && (
        <Expense
          categories={categories}
          closeModal={closeModal}
          setCurrentSect={setCurrentSect}
        />
      )}
    </ModalInstance>
  );
};

export default AddPayment;
