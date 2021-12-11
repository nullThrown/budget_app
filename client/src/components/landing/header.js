import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
const Header = () => {
  return (
    <header className='land__header'>
      <div className='land__header-box'>
        <h1 className='heading-1'>CoinDrop</h1>
        <p className='heading-5 text-center'>
          Track your money how you want to.
        </p>
        <div className='land__btn-box'>
          <Link to='signup' className='land__signup-link'>
            Sign Up
          </Link>
          <Link to='login' className='land__login-link'>
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
