import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <div className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Añadir artículos</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Lista de artículos</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Pedidos</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
