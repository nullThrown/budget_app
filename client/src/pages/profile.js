import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/nav';
import Header from '../components/profile/header/header';
import Banner from '../components/profile/banner/banner';
const Profile = () => {
  return (
    <div>
      <Nav />
      <main className='main-container'>
        <Header />
        <Banner />
        <Outlet />
      </main>
    </div>
  );
};
export default Profile;
