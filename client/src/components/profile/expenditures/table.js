import { useState, useEffect } from 'react';
const expenditures = [
  {
    date: '7 - 1 - 25',
    description: "ron's coffee",
    category: 'Dining',
    necessity: false,
    amount: 3.27,
  },
  {
    date: '7 - 1 - 25',
    description: "ron's coffee",
    category: 'Dining',
    necessity: true,
    amount: 3.27,
  },
  {
    date: '7 - 1 - 25',
    description: 'gym membership for the new thing',
    category: 'Dining',
    necessity: true,
    amount: 3.27,
  },
];

export const Table = () => {
  const [data, setData] = useState(expenditures);

  useEffect(() => {
    setData(expenditures);
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          <th className='table-cell-date'>Date</th>
          <th className='table-cell-desc'>Description</th>
          <th className='table-cell-category'>category</th>
          <th className='table-cell-necessity'></th>
          <th className='table-cell-amount'>amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((exp, i) => {
          return (
            <tr className={'table-row-data' + (i % 2 === 1 ? '' : ' bg-green')}>
              <td className='table-cell-date'>{exp.date}</td>
              <td className='table-cell-desc'>{exp.description}</td>
              <td className='table-cell-category'>{exp.category}</td>
              <td className='table-cell-necessity'>
                <span className='text-sm-i text'>
                  <p>{exp.necessity ? ' necessity' : ' indulgent'}</p>
                </span>
              </td>

              <td className='table-cell-amount'>${exp.amount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

{
  /* <table className='table'>
<thead>
  <tr className='table-row'>
    <th className='table-header'>Date</th>
    <th className='table-header'>Description</th>
    <th className='table-header'>category</th>
    <th className='table-header'>necessity</th>
    <th className='table-header'>amount</th>
  </tr>
</thead>
<tbody>
  <tr className='table-row'>
    <td>5-6-21</td>
    <td>7-11 Coffee</td>
    <td>Dining</td>
    <td>$3.27</td>
  </tr>
</tbody>
</table> */
}
