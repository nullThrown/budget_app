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
    necessity: false,
    amount: 3.27,
  },
  {
    date: '7 - 1 - 25',
    description: "ron's coffee",
    category: 'Dining',
    necessity: false,
    amount: 3.27,
  },
];

export const Table = () => {
  // const [data, setData] = useState(expenditures);

  // useEffect(() => {
  //   setData(expenditures);
  // }, [data]);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>category</th>
          <th>necessity</th>
          <th>amount</th>
        </tr>
      </thead>
      <tbody>
        {expenditures.map((exp) => {
          return (
            <tr className='table-row-data'>
              <td>{exp.date}</td>
              <td>{exp.description}</td>
              <td>{exp.category}</td>
              <td>{exp.necessity}</td>
              <td>${exp.amount}</td>
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
