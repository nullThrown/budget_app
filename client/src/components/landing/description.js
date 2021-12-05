import React from 'react';

const Description = () => {
  return (
    <section className='description'>
      <p className='text-center'>How does coin drop work?</p>
      <div className='desc-container'>
        <div className='desc-box'>
          {/* place an image or video here of the actual app */}
          <div className='fake-img-1'></div>
          <div>
            <p>
              Coin Drop is a daily budgeter that tracks every dollar in and out
              of your person. That trip to the grocery store. Add it and place
              it into its respective category. You can even describe it as a
              indulgent expediture or a necessity.
            </p>
          </div>
        </div>
        <div className='desc-box'>
          {/* place an image or video here of the actual app */}
          <div className='fake-img-2'></div>
          <div>
            <p>
              Coin Drop uses simple, easy-to-read charts and graphs for fast
              interpretation of your data. staring at numbers all day can become
              tiresome. We know, We do it ourselves. Coin drop is not a simple
              excel spreadsheet. It is built to be intuitive and understood with
              a mere glance.
            </p>
          </div>
        </div>
        <div className='desc-box'>
          {/* place an image or video here of the actual app */}
          <div className='fake-img-3'></div>
          <div>
            <p>
              Coin Drops main function is to display budgeting info as well
              expenditure tracking of the current month. Sort of...have I gone
              over my dining budget or how many times have I gone to the grocery
              store this month. However, coin drop also tracks yearly info as
              well as retirement planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Description;

const arr = [1, 2, 3];
arr.map((num) => {});
