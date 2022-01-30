import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/nav';
import Header from '../components/profile/header/header';
import Banner from '../components/profile/banner/banner';
import PaymentModal from '../components/common/modal/payment/modal';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      <PaymentModal isOpen={isOpen} closeModal={closeModal} />
      <Nav />
      <main className='main-container'>
        <Header />
        <Banner openModal={openModal} />
        <Outlet />
      </main>
    </div>
  );
};
export default Profile;
