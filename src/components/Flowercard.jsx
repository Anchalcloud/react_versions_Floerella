import { useContext } from "react";
import "./FlowerCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { WishlistContext } from "../context/WishlistContext";

function FlowerCard({ id, name, price, image, occasion, color }) {
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const flower = {
    id,
    name,
    price,
    image,
    occasion,
    color,
  };

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
    <div className="flower-card">

      <div className="flower-image-container">
        <img
          src={image}
          alt={name}
          className="flower-image"
        />

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={
              inWishlist
                ? "wishlist-active"
                : ""
            }
          />
        </button>
      </div>

      <div className="flower-card-details">
        <h3>{name}</h3>

        <div className="price-wishlist">
          <p className="price">₹{price}</p>

          <span className="flower-rating">
            ★ 4.9
          </span>
        </div>
      </div>

    </div>
  );
}

export default FlowerCard;