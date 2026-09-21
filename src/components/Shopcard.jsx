import { useState, useContext } from "react";
import "./Shopcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function ShopCard({ id , name, price, image, occasion, color }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const flower = { id, name, price, image, occasion, color,};

  const inWishlist = wishlist.some(
    (item) => item.id === id
  );

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(flower);
    }
  };

  return (
   
    <div className="shop-flower-card">

      <div className="shop-image">

        <img src={image} alt={name} />

        <button
          className="shop-wishlist"
           onClick={handleWishlist}
        >
          <FontAwesomeIcon
            icon={faHeart}
             className={inWishlist ? "wishlist-active" : ""}
          />
        </button>

      </div>


      <div className="shop-details">

        <p className="shop-occasion">{occasion}</p>

        <div className="shop-name-price">

          <h3>{name}</h3>

          <span>${price}</span>

        </div>

        <p className="shop-review">⭐ 4.9 · 214 reviews</p>

        <button className="add-cart-btn" onClick={() => addToCart(flower)}>
            Add To Cart </button>

      </div>

    </div>
  );
}

export default ShopCard;