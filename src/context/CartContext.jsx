import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ADD FLOWER TO CART
  const addToCart = (flower) => {
    setCart((prevCart) => {
      const existingFlower = prevCart.find(
        (item) => item.id === flower.id
      );

      // If flower already exists, increase quantity
      if (existingFlower) {
        return prevCart.map((item) =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new flower with quantity 1
      return [
        ...prevCart,
        {
          ...flower,
          quantity: 1,
        },
      ];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
  setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        );
    };

  // REMOVE FLOWER COMPLETELY
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // CLEAR ENTIRE CART
  const clearCart = () => {
      setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}