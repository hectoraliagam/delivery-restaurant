import { useState } from 'react';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';

const App = () => {

    const fee = 7;
    const [showLogin, setShowLogin] = useState(false);
    
  return (
    <>
    { showLogin ? <LoginPopup setShowLogin={ setShowLogin } /> : <></> }
      <div className="app">
        <Navbar setShowLogin={ setShowLogin } />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/cart' element={ <Cart fee={ fee } /> } />
          <Route path='/order' element={ <PlaceOrder fee={ fee } /> } />
          < Route path='/verify' element={ <Verify /> } />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
