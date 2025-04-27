import React, { createContext, useReducer, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    case 'REMOVE_FROM_CART':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const { isAuthenticated } = useAuth0();

  const handleCartAction = (action) => {
    if (!isAuthenticated) {
      // If user is not authenticated, don't perform the action
      return;
    }
    dispatch(action);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch: handleCartAction, isAuthenticated }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);