import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } =
    useContext(WishlistContext);

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <span>
            {wishlist.length} flower
            {wishlist.length !== 1 ? "s" : ""} saved
          </span>
        </div>

        {wishlist.length === 0 ? (

          <div className="empty-wishlist">
            <FontAwesomeIcon icon={faHeart} />
            <h2>Your Wishlist is Empty</h2>
            <p>
              Save your favorite flowers and they will appear here.
            </p>
          </div>

        ) : (

          <div className="wishlist-products">

            {wishlist.map((flower) => (

              <div
                className="wishlist-card"
                key={flower.id}
              >

                <div className="wishlist-image">

                  <img
                    src={flower.image}
                    alt={flower.name}
                  />

                  <button
                    className="remove-wishlist"
                    onClick={() =>
                      removeFromWishlist(flower.id)
                    }
                    title="Remove from wishlist"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>

                </div>

                <div className="wishlist-details">

                  <p className="wishlist-occasion">
                    {flower.occasion}
                  </p>

                  <div className="wishlist-name-price">

                    <h3>{flower.name}</h3>

                    <span>
                      ₹{flower.price}
                    </span>

                  </div>

                  <p className="wishlist-review">
                    ⭐ 4.9 · 214 reviews
                  </p>

                  <button className="wishlist-cart-btn">
                    Add To Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;