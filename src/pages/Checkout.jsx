import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Checkout() {

  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    payment: "cod",
  });

  const deliveryCharge = cart.length > 0 ? 50 : 0;
  const finalTotal = totalPrice + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.pincode
    ) {
      alert("Please fill in all required details.");
      return;
    }
    
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: "Dhanbad",
          pincode: formData.pincode,
      },

        items: cart.map((item) => ({
        flowerId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

        paymentMethod:
          formData.payment === "cod"
          ? "Cash on Delivery"
          : "Online Payment",

        subtotal: totalPrice,
        deliveryCharge: deliveryCharge,
        totalAmount: finalTotal,
      };

      try {
       const token = localStorage.getItem("token");

          const response = await axios.post(`${API_URL}/api/order/place`,
            orderData,
            {
              headers: {
                  token: token,
                  },
            }
        );
        
      if (response.data.success) {
        clearCart();
        navigate("/order-success");
      }
      } catch (error) {
        console.error("Order Error:", error);
        alert("Failed to place order.");
      }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <h1>Checkout</h1>

        {cart.length === 0 ? (
          <p className="empty-checkout">
            Your cart is empty.
          </p>
        ) : (
          <div className="checkout-container">

            {/* CUSTOMER DETAILS */}
            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >
              <h2>Customer Details</h2>

              {/* NAME + EMAIL */}
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE + PINCODE */}
              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

              {/* ADDRESS */}
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
              />

              {/* PAYMENT METHOD */}
              <div className="payment-section">

                <h2>Payment Method</h2>

                <div className="payment-options">

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.payment === "cod"}
                      onChange={handleChange}
                    />

                    <span>Cash on Delivery</span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formData.payment === "online"}
                      onChange={handleChange}
                    />

                    <span>Online Payment</span>
                  </label>

                </div>

              </div>

              <button
                type="submit"
                className="place-order-btn"
              >
                Place Order
              </button>

            </form>


            {/* ORDER SUMMARY */}
            <div className="checkout-summary">

              <h2>Your Order</h2>

              <div className="checkout-items">

                {cart.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="checkout-item-info">

                      <h3>{item.name}</h3>

                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                  </div>

                ))}

              </div>


              {/* PRICE SUMMARY */}
              <div className="price-summary">

                <hr />

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </div>

                <div className="summary-row checkout-total">
                  <strong>Total</strong>
                  <strong>₹{finalTotal}</strong>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Checkout;