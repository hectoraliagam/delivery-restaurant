import './LoginPopup.css';
import axios from "axios";
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Inicia sesión");
    const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
    });

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
      event.preventDefault();

      let newUrl = url;
      if (currState==="Inicia sesión") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={ onLogin } className="login-popup-container">
        <div className="login-popup-title">
          <h2>{ currState }</h2>
          <img onClick={ () => setShowLogin(false) } src={ assets.cross_icon } alt="" />
        </div>
        <div className="login-popup-inputs">
          { currState==="Inicia sesión" ? <></> : <input name='name' onChange={ onChangeHandler } value={ data.name } type="text" placeholder='Tu nombre' required />}
          <input name='email' onChange={ onChangeHandler } value={ data.email } type="email" placeholder='Correo electrónico' required />
          <input name='password' onChange={ onChangeHandler } value={ data.password } type="password" placeholder='Contraseña' required />
        </div>
        <button type='submit'>{ currState==="Regístrate" ? "Crea una cuenta" : "Inicia sesión" }</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
        {
          currState==="Inicia sesión"
          ? <p>¿Desea crear una nueva cuenta? <span onClick={ () => setCurrState("Regístrate") }>Haga clic aquí</span></p>
          : <p>¿Ya tienes una cuenta? <span onClick={ () => setCurrState("Inicia sesión") }>Inicia sesión aquí</span></p>
        }
      </form>
    </div>
  );
}

export default LoginPopup;
