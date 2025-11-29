import './PlaceOrder.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = ({ fee }) => {

    const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
    });

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];

      foodList.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({ ...item, quantity: cartItems[item._id] });
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + fee,
      }

      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        alert("Error");
      }
    }

    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/cart");
      } else if (getTotalCartAmount() === 0) {
        navigate("/cart");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

  return (
    <form onSubmit={ placeOrder } className='place-order'>

      <div className="place-order-left">
        <p className="title">Información para la entrega</p>
        <div className="multi-fields">
          <input name='firstName' onChange={ onChangeHandler } value={ data.firstName } type="text" placeholder='Nombres' required />
          <input name='lastName' onChange={ onChangeHandler } value={ data.lastName } type="text" placeholder='Apellidos' required />
        </div>
        <input name='email' onChange={ onChangeHandler } value={ data.email } type="email" placeholder='Correo electrónico' required />
        <input name='street' onChange={ onChangeHandler } value={ data.street } type="text" placeholder='Dirección' required />
        <div className="multi-fields">
          <input name='city' onChange={ onChangeHandler } value={ data.city } type="text" placeholder='Ciudad' required />
          <input name='state' onChange={ onChangeHandler } value={ data.state } type="text" placeholder='Región' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={ onChangeHandler } value={ data.zipcode } type="text" placeholder='Código postal' required />
          <input name='country' onChange={ onChangeHandler } value={ data.country } type="text" placeholder='País' required />
        </div>
        <input name='phone' onChange={ onChangeHandler } value={ data.phone } type="text" placeholder='Teléfono' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total del carrito</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${ getTotalCartAmount() }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Cargo por envío</p>
              <p>${ getTotalCartAmount() === 0 ? 0 : fee }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${ getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + fee }</b>
            </div>
          </div>
          <button type='submit'>PROCEDER AL PAGO</button>
        </div>
      </div>

    </form>
  );
}

export default PlaceOrder;
