import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
const Header = () => {
  return (
    <header className='header'>
      <div className='header-box'>
        <h1 className='heading-1'>CoinDrop</h1>
        <p className='heading-5 text-center'>
          Track your money how you want to.
        </p>
        <div className='btn-box'>
          <Link to='signup' className='signup-link'>
            Sign Up
          </Link>
          <Link to='login' className='login-link'>
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
