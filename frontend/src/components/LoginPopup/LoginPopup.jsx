import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Inicia sesión")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Inicia sesión"?<></>:<input type="text" placeholder='Tu nombre' required />}
          <input type="email" placeholder='Correo electrónico' required />
          <input type="password" placeholder='Contraseña' required />
        </div>
        <button>{currState==="Regístrate"?"Crea una cuenta":"Inicia sesión"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
        {
          currState==="Inicia sesión"
          ?<p>¿Desea crear una nueva cuenta? <span onClick={()=>setCurrState("Regístrate")}>Haga clic aquí</span></p>
          :<p>¿Ya tienes una cuenta? <span onClick={()=>setCurrState("Inicia sesión")}>Inicia sesión aquí</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
