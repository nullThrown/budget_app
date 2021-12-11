import { map } from 'async';
import React from 'react'
import './recurring.css'
import recurring from '../../../data/recurring'
// figure out how data will be supplied later
// very difficult problem
 const Recurring = () => {
     
    return (
        <section className='card recurring'>
            <h3 className='heading-4 text-center'>Recurring Payments</h3>
            <div className='payment__category'>
                <p className=' payment__title text-sm'>Housing</p>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>rent</p>
                    <span className='payment__item-amt   text-sm'>1200</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>insurance</p>
                    <span className='payment__item-amt   text-sm'>150</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>gardener</p>
                    <span className='payment__item-amt   text-sm'>100</span>
                </div>
            </div>
            <div className='payment__category'>
                <p className=' payment__title text-sm'>Vehicle</p>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>insurance</p>
                    <span className='payment__item-amt   text-sm'>120</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>loan</p>
                    <span className='payment__item-amt   text-sm'>350</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>cleaner</p>
                    <span className='payment__item-amt   text-sm'>100</span>
                </div>
            </div>
            <div className='payment__category'>
                <p className=' payment__title text-sm'>Housing</p>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>rent</p>
                    <span className='payment__item-amt   text-sm'>1200</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>insurance</p>
                    <span className='payment__item-amt   text-sm'>150</span>
                </div>
                <div className='flex payment__item'>
                    <p className='payment__item-title text-sm'>gardener</p>
                    <span className='payment__item-amt   text-sm'>100</span>
                </div>
            </div>
        </section>
    )
}

const PaymentItem = () => {
    return (
        <div>
            <p>heading</p>
            
        </div>

    )
    
}

export default Recurring;