import { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (flower) => {
    setWishlist((prevWishlist) => {
      const alreadyExists = prevWishlist.some(
        (item) => item.id === flower.id
      );

      if (alreadyExists) {
        return prevWishlist;
      }

      return [...prevWishlist, flower];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}