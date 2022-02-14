import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/nav';
import Header from '../components/profile/header/header';
import Banner from '../components/profile/banner/banner';
import AddPayment from '../components/common/modal/sections/addPayment';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      <AddPayment isOpen={isOpen} closeModal={closeModal} />
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
