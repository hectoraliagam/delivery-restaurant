import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo"></img>
      <ul className="navbar-menu">
        <li>Inicio</li>
        <li>Menú</li>
        <li>Aplicación</li>
        <li>Contáctanos</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Iniciar Sesión</button>
      </div>
    </div>
  )
}

export default Navbar
