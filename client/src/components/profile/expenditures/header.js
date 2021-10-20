export const Header = () => {
  return (
    <header>
      <div className='title-box'>
        <h2 className='header-title'>Expenditures</h2>
        <button>Add Expenditure</button>
      </div>
      <div className='header-desc'>
        <h3>
          <small className='text-sm-i'>category</small> Dining
        </h3>
        <h4>budget: $300</h4>
        <p className='header-spent'>
          {/* add a percentage of budget spent in line form */}
          {/* spent amount should be green or red and much larger than other text */}
          spent: $135.32 <small className='text-sm-i'>of</small> $300
        </p>
      </div>
    </header>
  );
};