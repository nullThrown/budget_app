import React from 'react';

const Description = () => {
  return (
    <div className='create-profile-desc'>
      <h2 className='heading-3 text-center'>Create Profile</h2>
      <p>
        Now that you have created an account; the next step is to create your
        financial profile. All inputs except for salary and pay period are
        payments you make on a monthly basis.
      </p>
      <p>
        The 'Debt' section for instance is not the total amount of debt you owe
        but the sum of your outgoing cash to pay said debts. If a payment is not
        made on a monthly basis or is otherwise inconsistent (changes from month
        to month) then leave that section at $0.
      </p>
      <p>
        You can add one-time payments if a monthly basis does not apply for that
        specific item.
      </p>
    </div>
  );
};

export default Description;
