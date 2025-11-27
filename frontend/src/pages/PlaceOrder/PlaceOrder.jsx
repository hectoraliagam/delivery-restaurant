import { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

    const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className='place-order'>

      <div className="place-order-left">
        <p className="title">Información del Delivery</p>
        <div className="multi-fields">
          <input type="text" placeholder='Nombres' />
          <input type="text" placeholder='Apellidos' />
        </div>
        <input type="email" placeholder='Correo electrónico' />
        <input type="text" placeholder='Dirección' />
        <div className="multi-fields">
          <input type="text" placeholder='Ciudad' />
          <input type="text" placeholder='Región' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Código postal' />
          <input type="text" placeholder='País' />
        </div>
        <input type="text" placeholder='Teléfono' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total del carrito</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Cargo por envío</p>
              <p>${getTotalCartAmount()===0?0:5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
            </div>
          </div>
          <button>PROCEDER AL PAGO</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
