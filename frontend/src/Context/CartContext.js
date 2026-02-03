import React, { createContext, useState } from "react";

// @ts-ignore
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addItem = (quantity = 1) => {
    setCartCount((prev) => prev + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, addItem, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
