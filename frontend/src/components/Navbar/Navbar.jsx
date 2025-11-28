import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

  return (
    <div className="navbar">
      <Link to='/'><img src={ assets.logo } alt="" className="logo"></img></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={ () => setMenu("home") } className={ menu==="home" ? "active" : "" }>Inicio</Link>
        <a href='#explore-menu' onClick={ () => setMenu("menu") } className={ menu==="menu" ? "active" : "" }>Menú</a>
        <a href='#app-download' onClick={ () => setMenu("mobile-app") } className={ menu==="mobile-app" ? "active" : "" }>Aplicación</a>
        <a href='#footer' onClick={ () => setMenu("contact-us") } className={ menu==="contact-us" ? "active" : "" }>Contáctanos</a>
      </ul>
      <div className="navbar-right">
        <img src={ assets.search_icon } alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={ assets.basket_icon } alt="" /></Link>
          <div className={ getTotalCartAmount()===0 ? "" : "dot" }></div>
        </div>
        { !token 
        ? <button onClick={ () => setShowLogin(true) }>Regístrate</button> 
        : <div className='navbar-profile'>
            <img src={ assets.profile_icon } alt="" />
            <ul className='nav-profile-dropdown'>
              <li><img src={ assets.bag_icon } alt="" /><p>Pedidos</p></li>
              <hr />
              <li onClick={logout}><img src={ assets.logout_icon } alt="" /><p>Cerrar sesión</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default Navbar;
