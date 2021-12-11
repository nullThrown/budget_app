import React from 'react'
import { Link } from 'react-router-dom';
import './landing.css';
 const Footer = () => {
    return (
        <footer className='land__footer'>
        <div className='land__footer-box'>
          <p className='heading-5 text-center'>
            Sign up now. It's free, you have nothing to lose
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
      </footer>
    )
}

export default Footer;
