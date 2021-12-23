import React from 'react';
import { Link } from 'react-router-dom';
import paperBoats from '../../assets/images/paper-boats.jpg';
import './landing.css';
const Header = () => {
  return (
    <header
      className='land__header'
      style={{
        backgroundImage: `linear-gradient(190deg, #fa7c30 30%, rgba(0, 0, 0, 0)30%), url(${paperBoats})`,
      }}>
      <div className='land__header-box'>
        <h1 className='main-heading'>CoinDrop</h1>
        <p className='heading-5 text-center text-white'>
          Track your money how you want to.
        </p>
        <div className='land__btn-box'>
          <Link to='signup' className='land__btn land__signup-link'>
            Sign Up
          </Link>
          <Link to='login' className='land__btn land__login-link'>
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
