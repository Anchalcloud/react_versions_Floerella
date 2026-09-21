import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="order-success-page">
        <div className="success-card">
          
          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for your order! 🌸
            Your beautiful flowers will be prepared with care.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;