import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactModal from 'react-modal';
//import from single page and/or use lazy loading
import Login from './pages/login';
import Signup from './pages/signup';
import SignupSuccess from './pages/signupSuccess';
import CreateProfile from './pages/createProfile';
import Account from './pages/account';
import Profile from './pages/profile';
import Home from './pages/home';
import Landing from './pages/landing';
import NotFound from './pages/notFound';
import Year from './pages/year';
import Testing from './pages/testing';

ReactModal.setAppElement('#root');

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signup-successful' element={<SignupSuccess />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/profile' element={<Profile />}>
          <Route path='home' element={<Home />} />
          <Route path='year' element={<Year />} />
        </Route>
        {/* <Route path='/year' element={<Year />} /> */}
        <Route path='/account' element={<Account />} />
        <Route path='/test' element={<Testing />} />

        {/* error path */}
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
