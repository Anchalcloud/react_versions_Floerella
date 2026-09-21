import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  const deliveryCharge = totalPrice > 0 ? 50 : 0;

  const finalTotal = totalPrice + deliveryCharge;

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>My Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-products">
              {cart.map((flower) => (
                <div className="cart-card" key={flower.id}>
                  <img src={flower.image} alt={flower.name} />

                  <div className="cart-details">
                    <p>{flower.occasion}</p>

                    <h3>{flower.name}</h3>

                    <span>₹{flower.price}</span>
                  </div>

                  {/* QUANTITY */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(flower.id)}
                    >
                      −
                    </button>

                    <span>{flower.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(flower.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <p className="item-total">
                    ₹{flower.price * flower.quantity}
                  </p>

                  {/* REMOVE */}
                  <button
                    className="remove-cart"
                    onClick={() => removeFromCart(flower.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* CART TOTAL */}
            <div className="cart-summary">
                <h2>Order Summary</h2>

              <div>
                <span>Total Items:</span>

                <span> {cart.reduce( (total, item) => total + item.quantity, 0 )}</span>
              </div>

              <div>
                <span>Subtotal:</span>

                <span>₹{totalPrice}</span>
              </div>

              <div>
                  <span>Delivery:</span>

                  <span>₹{deliveryCharge}</span>
              </div>

              <hr />

              <div className="final-total">
                  <strong>Total:</strong>

                  <strong>₹{finalTotal}</strong>
              </div>

              <button className="checkout-btn"  onClick={() => navigate("/checkout")}> 
                Proceed to Checkout </button>
            </div>   
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;