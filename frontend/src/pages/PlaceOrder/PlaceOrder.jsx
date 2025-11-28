import './PlaceOrder.css';
import { useContext, useState } from 'react';
import StoreContext from '../../context/StoreContext';

const PlaceOrder = ({ fee }) => {

    const { getTotalCartAmount, foodList, cartItems } = useContext(StoreContext);

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
      foodList.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
      console.log(orderItems);
    }

  return (
    <form onSubmit={ placeOrder } className='place-order'>

      <div className="place-order-left">
        <p className="title">Información para la entrega</p>
        <div className="multi-fields">
          <input name='firstName' onChange={ onChangeHandler } value={ data.firstName } type="text" placeholder='Nombres' />
          <input name='lastName' onChange={ onChangeHandler } value={ data.lastName } type="text" placeholder='Apellidos' />
        </div>
        <input name='email' onChange={ onChangeHandler } value={ data.email } type="email" placeholder='Correo electrónico' />
        <input name='street' onChange={ onChangeHandler } value={ data.street } type="text" placeholder='Dirección' />
        <div className="multi-fields">
          <input name='city' onChange={ onChangeHandler } value={ data.city } type="text" placeholder='Ciudad' />
          <input name='state' onChange={ onChangeHandler } value={ data.state } type="text" placeholder='Región' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={ onChangeHandler } value={ data.zipcode } type="text" placeholder='Código postal' />
          <input name='country' onChange={ onChangeHandler } value={ data.country } type="text" placeholder='País' />
        </div>
        <input name='phone' onChange={ onChangeHandler } value={ data.phone } type="text" placeholder='Teléfono' />
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
