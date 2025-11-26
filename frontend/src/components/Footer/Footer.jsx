import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore consectetur iste libero accusantium modi ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsam iure asperiores laboriosam harum totam voluptas.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>EMPRESA</h2>
          <ul>
            <li>Inicio</li>
            <li>Quiénes somos</li>
            <li>Delivery</li>
            <li>Política de privacidad</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTÁCTENOS</h2>
          <ul>
            <li>+51 987654321</li>
            <li>contacto@restaurante.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Restaurante.com — Todos los derechos reservados.</p>
    </div>
  )
}

export default Footer
