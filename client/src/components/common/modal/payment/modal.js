import { useState } from 'react';
import Modal from 'react-modal';
import '../modal.css';
import RecurringSection from './recurringSect';
import ExpenseSection from './expenseSect';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import customStyles from '../styles';

const PaymentModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [currentSect, setCurrentSect] = useState('start');

  const categorySelector = (state) =>
    state.expenses.data.map((expense) => expense.category);

  const categories = useSelector(categorySelector);

  const onRequestClose = () => {
    dispatch({ type: 'expenses/returnToIdle' });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      style={customStyles}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}>
      {currentSect !== 'start' && (
        <button
          className='btn modal__return-btn'
          onClick={() => setCurrentSect('start')}>
          <BsArrowReturnLeft />
        </button>
      )}
      <button
        type='button'
        className='btn modal-close-btn'
        onClick={closeModal}>
        X
      </button>
      {currentSect === 'start' && (
        <>
          <h3 className='heading-6 text-center'>Add Payment</h3>
        </>
      )}
      {currentSect === 'start' && (
        <div className='modal__btn-box'>
          <button
            type='button'
            className='btn mr-1 modal__btn'
            onClick={() => setCurrentSect('recurring')}>
            Recurring
          </button>
          <button
            type='button'
            className='btn modal__btn'
            onClick={() => setCurrentSect('expense')}>
            One Time
          </button>
        </div>
      )}
      {currentSect === 'recurring' && (
        <RecurringSection categories={categories} closeModal={closeModal} />
      )}
      {currentSect === 'expense' && (
        <ExpenseSection categories={categories} closeModal={closeModal} />
      )}
    </Modal>
  );
};

export default PaymentModal;
