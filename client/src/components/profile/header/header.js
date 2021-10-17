import './header.css';
export const Header = () => {
  return (
    <header className='header'>
      <h2 className='heading-2 title'>Header</h2>
      <div className='user-nav'>
        <i class='far fa-calendar-alt'></i>
        <i class='far fa-chart-bar'></i>
        <i class='far fa-bell'></i>
        <i class='far fa-user-circle user'></i>
      </div>
    </header>
  );
};
