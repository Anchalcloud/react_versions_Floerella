import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx"
import  "./Myorders.css";

const API_URL = import.meta.env.VITE_BACKEND_URL;


function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchOrders = async () => {

     const token = localStorage.getItem("token");

      try {

          const response = await axios.get(`${API_URL}/api/order/my-orders`,
            {
              headers: {
                token: token,
              },
            }
          );

          if (response.data.success) {
            setOrders(response.data.orders);
          } else {
            setError(response.data.message);
          }

      } catch (error) {
          console.log("My Orders Error:", error);
          setError("Failed to fetch your orders.");

      } finally {

        setLoading(false);

      }
    }

  fetchOrders();
}, []);

  return (
   <>
    <Navbar />
    <div className="my-orders-page">
      
     <h1  className="my-orders-title"> My Orders </h1>

     {loading ? (
        <p>Loading your orders...</p>
        ) : error ? (
          <p>{error}</p>
    ) : orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
    ) : (
        
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
                <div>
                   <h2>Order #{order._id}</h2>
                     <p> Date: {new Date(order.createdAt).toLocaleDateString()}  </p>
                </div>

                    <span  className={`order-status ${order.orderStatus.toLowerCase().replace(" ", "-")}`}> 
                       {order.orderStatus}  </span>
            </div>

              <div className="order-summary">
                     <p>Payment: {order.paymentMethod}</p>
                     <p>Total: ₹{order.totalAmount}</p>
              </div>

            <h3 className="items-title">Items</h3>
    
            {order.items.map((item, index) => (
                     <div className="order-item" key={index}>
                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p>₹{item.price} × {item.quantity}</p>
                        </div>

                        <p className="item-total">  ₹{item.price * item.quantity} </p>
                      </div>
             ))}
          </div>
        ))

      )}
    </div>
   </> 
  );
}

export default MyOrders;