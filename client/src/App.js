import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import from single page and/or use lazy loading
import Login from './pages/login';
import Signup from './pages/signup';
import Account from './pages/account';
import Home from './pages/home';
import Landing from './pages/landing';
import NotFound from './pages/notFound';
import Year from './pages/year';
function App() {
  return (
    <Router>
      <main className='main-container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Landing />} />
          <Route path='/year' element={<Year />} />

          {/* error path */}
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
