import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/nav';
import Header from '../components/profile/header/header';
import Banner from '../components/profile/banner/banner';
import AddPayment from '../components/common/modal/sections/addPayment';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [isNavOpen, setIsNavOpen] = useState(null);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    // forces the nav to open at 1150px screen width
    const mediaQuery = window.matchMedia('(min-width: 1150px)');
    const listener = () =>
      mediaQuery.matches ? setIsNavOpen(true) : setIsNavOpen(false);

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <div>
      <AddPayment isOpen={isOpen} closeModal={closeModal} />
      <Nav isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main className='main-container'>
        <Header toggleNav={toggleNav} />
        <Banner openModal={openModal} />
        <Outlet />
      </main>
    </div>
  );
};
export default Profile;
