import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Adminorder.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get( "http://localhost:4000/api/order/all",
          {
              headers: {
                  token: token,
              },
          }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  const updateOrderStatus = async (id, status) => {

    try {

        const adminToken = localStorage.getItem("adminToken");

        const response = await axios.put( `http://localhost:4000/api/order/update/${id}`,
          { orderStatus: status, },

          {
            headers: {
              token: adminToken,
            },
          }
        );

        if (response.data.success) {
            setOrders((prevOrders) =>
            prevOrders.map((order) =>
            order._id === id
            ? {
                ...order,
                orderStatus: status,
              }
            : order
            )
          );
        }
      }catch (error) {
        console.error("Update Order Error:", error);
      }

  };


    const deleteOrder = async (id) => {

      const confirmDelete = window.confirm(  "Are you sure you want to delete this order?"  );

      if (!confirmDelete) {
        return;
      }

      try {
          const adminToken = localStorage.getItem("adminToken");

          const response = await axios.delete(  `http://localhost:4000/api/order/delete/${id}`,
              {
                headers: {
                  token: adminToken,
                },
              }
          );

        if (response.data.success) {
            setOrders((prevOrders) =>  prevOrders.filter((order) => order._id !== id)  );
          }
          } catch (error) {
              console.error("Delete Order Error:", error);
          }
      };
  

    return (
        <div className="admin-orders">
          <h1>Customers Orders</h1>



          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
            <div className="order-card" key={order._id}>
          
            <div className="order-header">
                <div className="order-header-left">
                  <h2>Order #{order._id}</h2>
                </div>

                <div className="order-header-actions">

                  <button className="delete-order-button"  onClick={() => deleteOrder(order._id)} >
                    Delete  </button>

                  <select value={order.orderStatus} onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value) }>

                    <option value="Order Placed">Order Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Out for Delivery">  Out for Delivery </option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
            </div>

            <div className="customer-info">
              <h3>Customer Details</h3>
              <p> <strong>Name:</strong> {order.customer.name} </p>

              <p> <strong>Email:</strong> {order.customer.email} </p>

              <p>  <strong>Phone:</strong> {order.customer.phone}  </p>

              <p>  <strong>Address:</strong> {order.customer.address},{" "}
                  {order.customer.city} - {order.customer.pincode}
              </p>
            </div>

            <div className="order-items">
              <h3>Ordered Flowers</h3>

              {order.items.map((item) => (
                <div className="order-item" key={item._id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <strong> ₹{item.price * item.quantity}  </strong>
                </div>
              ))}
            </div>

            <div className="order-summary">
                <p>
                    <strong>Payment:</strong>{" "}
                      {order.paymentMethod}
                </p>

                <p> <strong>Subtotal:</strong> ₹{order.subtotal}  </p>

                <p>  <strong>Delivery:</strong> ₹{order.deliveryCharge}  </p>

                <h3>  Total: ₹{order.totalAmount}  </h3>
              </div>

            </div>
          ))
        )}

          <div className="admin-logout-container">

            <button  className="admin-logout-button" 
                 onClick={() => {  localStorage.removeItem("adminToken");
                    navigate("/admin/login");
                  }}>  Logout  </button>
          </div>
      </div>
    );
}

export default AdminOrders;