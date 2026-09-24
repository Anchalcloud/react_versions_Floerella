import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/Myorders";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Profile from "./pages/Profile.jsx"




function App() {
  return (
    <Routes>
        <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout" element={  <ProtectedRoute>   <Checkout />  </ProtectedRoute>} />
      <Route path="/order-success" element={  <ProtectedRoute> <OrderSuccess />  </ProtectedRoute>} />
      <Route path="/admin/orders" element={ <AdminProtectedRoute> <AdminOrders /> </AdminProtectedRoute>} />
      <Route path="/my-orders" element={  <ProtectedRoute>  <MyOrders /> </ProtectedRoute>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/profile" element={ <ProtectedRoute>   <Profile />  </ProtectedRoute>} />

    </Routes>
  );
}

export default App;