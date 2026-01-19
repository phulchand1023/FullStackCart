import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        <h3>Cart</h3>
        <p>Please login to view your cart</p>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <h3>Shopping Cart</h3>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id}>
              <div>
                <h4>{item.name}</h4>
                <p>Price: Rs {item.price} each</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({ 
                    id: item.id, 
                    quantity: parseInt(e.target.value) 
                  }))}
                />
                <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </div>
          ))}
          
          <div>
            <h4>Total: Rs {totalAmount.toFixed(2)}</h4>
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <button>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;