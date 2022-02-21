import React from 'react';
import Modal from 'react-modal';
import './modal.css';
import customStyles from './styles';
const ModalInstance = ({
  isOpen,
  onRequestClose,
  closeModal,
  title,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      style={customStyles}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeModal={closeModal}>
      <header className='modal__header'>
        <h3 className='modal__title heading-4'>{title}</h3>
        <button
          type='button'
          className='btn modal__close-btn'
          onClick={onRequestClose}>
          &times;
        </button>
      </header>
      {children}
      <footer className='modal__footer'></footer>
    </Modal>
  );
};

export default ModalInstance;
