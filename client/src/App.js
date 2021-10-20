import './App.css';
import { Expenditures } from './components/profile/expenditures/expenditures';
import { Budget } from './components/profile/budget/budget';
import { Header } from './components/profile/header/header';
import { Login } from './components/form/login/login';
import { Signup } from './components/form/signup/signup';
function App() {
  return (
    <main className='main-container'>
      <Signup />
    </main>
  );
}

export default App;
