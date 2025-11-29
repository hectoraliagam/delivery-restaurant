import './Cart.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from '../../context/StoreContext';

const Cart = ({ fee }) => {

    const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

    const navigate = useNavigate();

  return (
    <div className='cart'>

      <div className="cart-items">
        <div className="cart-items-title">
          <p>Artículos</p>
          <p>Título</p>
          <p>Precio</p>
          <p>Cantidad</p>
          <p>Total</p>
          <p>Eliminar</p>
        </div>
        <br />
        <hr />
        { foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={ url + "/images/" + item.image } alt="" />
                  <p>{ item.name }</p>
                  <p>S/{ item.price }</p>
                  <p>{ cartItems[item._id] }</p>
                  <p>S/{ item.price * cartItems[item._id] }</p>
                  <p onClick={ () => removeFromCart(item._id) } className='cross'>X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total del carrito</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>S/{ getTotalCartAmount() }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Cargo por envío</p>
              <p>S/{ getTotalCartAmount() === 0 ? 0 : fee }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>S/{ getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + fee }</b>
            </div>
          </div>
          <button onClick={ () => navigate('/order') }>PROCEDER CON LA COMPRA</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Si tienes un código promocional, introdúcelo aquí</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='código' />
              <button>Enviar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cart;
