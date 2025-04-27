import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth0 } from "@auth0/auth0-react";
import './styles/Cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleRemoveFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', index });
  };

  if (!isAuthenticated) {
    return (
      <motion.div 
        className="cart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="cart-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Please Sign In
        </motion.h2>
        <motion.p
          className="cart-empty-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          You need to sign in to view your cart
        </motion.p>
        <button 
          className="auth-button" 
          onClick={() => loginWithRedirect()}
        >
          Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="cart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="cart-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your Cart
      </motion.h2>
      {cart.length === 0 ? (
        <motion.p
          className="cart-empty-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          No items in cart yet!
        </motion.p>
      ) : (
        <ul className="cart-items">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <button className="remove-from-cart" onClick={() => handleRemoveFromCart(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Cart;