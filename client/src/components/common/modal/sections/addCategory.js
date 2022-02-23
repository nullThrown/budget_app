import { useEffect, useState } from 'react';
import { createCategory } from '../../../../features/profile/middleware';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../../../alert/success';
import { Alert } from '../../../alert/alert';
import { BsArrowReturnLeft } from 'react-icons/bs';
import NecessitySelect from '../necessitySelect';

const Category = ({ categories, closeModal, setCurrentSect }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: '',
    budget: null,
    isDisplayed: true,
  });
  const [isCatMatch, setIsCatMatch] = useState(false);

  const profileStatus = useSelector((state) => state.profile.status);

  const onInputChange = (e) => {
    const name = e.target.name;

    if (name === 'boolean-select-true') {
      setCategory({ ...category, isDisplayed: true });
    } else if (name === 'boolean-select-false') {
      setCategory({ ...category, isDisplayed: false });
    } else {
      setCategory({ ...category, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCatMatch) {
      dispatch(createCategory(category));
    }
  };

  useEffect(() => {
    setIsCatMatch(() => {
      return categories.some((cat) => {
        return cat.name === category.name.trim().toLowerCase();
      });
    });
  }, [category.name, categories]);

  if (profileStatus === 'cat_loading') {
    return (
      <div className='center-container'>
        <Loading />
      </div>
    );
  }
  if (profileStatus === 'cat_success') {
    return (
      <Success
        text='Category Created Successfully'
        actionCreator={{ type: 'profile/returnToIdle' }}
        closeModal={closeModal}
      />
    );
  }

  return (
    <section className='modal__form-sect'>
      {profileStatus === 'error' && <Alert msg='Something went wrong' />}
      <button className='btn' onClick={() => setCurrentSect('Add Payment')}>
        <BsArrowReturnLeft className='modal__return-btn' />
      </button>
      <form onSubmit={handleSubmit} className='modal__form'>
        <input
          type='text'
          name='name'
          className='input-border-bottom modal__category-name'
          placeholder='Name'
          value={category.name}
          onChange={onInputChange}
          required
        />

        <span className='flex align-center modal__category-amount '>
          <p className='dollar-symbol'>$</p>
          <input
            type='number'
            name='budget'
            className='input-border-bottom '
            placeholder='budget'
            value={category.budget}
            onChange={onInputChange}
            required
          />
        </span>
        <span className='modal__category-display-msg text-sm'>
          <p>
            If set to 'Display', The category will be visible in the budget
            graph.
          </p>
          <p className='mt-1-2'>
            Which categories are displayed can always be changed in settings.
          </p>
        </span>
        <NecessitySelect
          value={category.isDisplayed}
          onInputChange={onInputChange}
          className='modal__category-nec-select'
          btnsConfig={[
            'Display',
            'fade-in-green',
            "Don't Display",
            'fade-in-red',
          ]}
        />
        {isCatMatch && <Alert msg='category name already exists!' />}
        <button
          type='submit'
          className={`btn btn-submit modal__category-submit-btn ${
            isCatMatch ? 'btn--disabled' : ''
          }`}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Category;
