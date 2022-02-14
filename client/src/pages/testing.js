import React, { useState } from 'react';
import ModalInstance from '../components/common/modal/modal';
const Testing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const onRequestClose = () => {
    console.log('on request close fn ran');
    closeModal();
  };
  return (
    <main className='center-container'>
      <div className='flex mb-1'>
        <button className='btn' onClick={openModal}>
          Open Modal
        </button>
      </div>
      <ModalInstance
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        title='Test Modal'
        closeModal={onRequestClose}></ModalInstance>
    </main>
  );
};
export default Testing;
