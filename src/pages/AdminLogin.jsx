import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);

        navigate("/admin/orders");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <h1>Admin Login</h1>
        <p>Login to manage Flowerella</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;