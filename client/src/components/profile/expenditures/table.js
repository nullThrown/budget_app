export const Table = ({data}) => {
  return (
    <table>
      <thead>
        <tr className='header-row'>
          <th className='table-cell-date'>Date</th>
          <th className='table-cell-desc'>Description</th>
          <th className='table-cell-category'>category</th>
          <th className='table-cell-necessity'></th>
          <th className='table-cell-amount'>amount</th>
          <th className='table-cell-edit'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((exp, i) => {
          return (
            <tr key={i} className='table-row-data'>
              <td className='table-cell-date'>{exp.date}</td>
              <td className='table-cell-desc'>{exp.description}</td>
              <td className='table-cell-category'>{exp.category}</td>
              <td className='table-cell-necessity'>
                <span
                  className={
                    'text-sm ' +
                    (exp.necessity ? 'text-bg-green' : 'text-bg-red')
                  }>
                  {exp.necessity ? ' necessity' : ' indulgent'}
                </span>
              </td>

              <td className='table-cell-amount'>${exp.amount}</td>
              <td className='table-cell-edit'>
                {' '}
                <button className='btn link'>edit</button>
              </td>
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
