export const Nav = ({ categories }) => {
  return (
    <nav className='nav'>
      <ol className='nav-list'>
        {categories.map((category, i) => {
          return (
            <li key={i}>
              <button className='btn nav-item-btn'>{category}</button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
