import { useState } from 'react';
import './monthlySpecifics.css';
const data = [
  {
    title: 'housing',
    budget: 2000,
    spent: 1456,
  },
  {
    title: 'vehicle',
    budget: 500,
    spent: 255,
  },
  {
    title: 'misc',
    budget: 400,
    spent: 123.34,
  },
  {
    title: 'Dining',
    budget: 200,
    spent: 65.33,
  },
  {
    title: 'housing',
    budget: 2000,
    spent: 1456,
  },
  {
    title: 'vehicle',
    budget: 500,
    spent: 255,
  },
  {
    title: 'misc',
    budget: 400,
    spent: 123.34,
  },
  {
    title: 'Dining',
    budget: 200,
    spent: 65.33,
  },
  {
    title: 'Dining',
    budget: 200,
    spent: 65.33,
  },
];
export const MonthlySpecifics = () => {
  const [categoryData, setCategoryData] = useState(data);
  return (
    <article className='monthly-specifics'>
      <h2 className='heading-4 text-center'>Monthly Specifics</h2>
      <div className='category-box'>
        {categoryData.map((category) => {
          return <Category category={category} />;
        })}
      </div>
    </article>
  );
};

const Category = ({ category }) => {
  const { title, budget, spent } = category;
  return (
    <div className='flex-col category'>
      <h4 className='heading-6'>{title}</h4>
      <span>
        <p>
          <span className='text-bg-red text-sm'>${spent}</span> of
          <span className='text-bg-green text-sm'>${budget}</span>
        </p>
      </span>
    </div>
  );
};
