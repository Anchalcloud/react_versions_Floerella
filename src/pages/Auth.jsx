import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import AuthContext from "../context/AuthContext";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");

  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

    const handleChange = (e) => {
        setFormData({ ...formData,  [e.target.name]: e.target.value, });
    };


    const handleRegister = async (e) => {
      e.preventDefault();

      try {
            const response = await axios.post(  "http://localhost:4000/api/user/register",
                formData
            );

            if (response.data.success) {
                setMessage("Account created successfully!");
                navigate("/home");
            } else {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error("Registration Error:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(  "http://localhost:4000/api/user/login",
                {
                  email: formData.email,
                  password: formData.password,

                }
            );

            if (response.data.success) {
               
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
                navigate("/home");
            } else {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error("Login Error:", error);
        }
    };


  return (
    <div  className="auth-page">
            {isLogin ? (
                <div className="auth-container">
                    <h1>Login</h1>

                    {message && <p className="auth-message">{message}</p>}

                    <form className="auth-form" onSubmit={handleLogin}>

                        <input  type="email"  name="email"  placeholder="Enter your email"
                           className="auth-input" value={formData.email}  onChange={handleChange} />

                        <input  type="password"  name="password"   placeholder="Enter your password"
                           className="auth-input" value={formData.password}   onChange={handleChange} />

                        <button className="auth-button" type="submit">Login</button>

                    </form>


                    <p className="auth-switch"> Don't have an account?{" "}
                        <button  className="auth-switch-button" onClick={() => setIsLogin(false)}>  Create one  </button>
                    </p>
                </div>
            ) : (

                <div className="auth-container">
                    <h1>Create Account</h1>

                    {message && <p className="auth-message">{message}</p>}

                    <form className="auth-form" onSubmit={handleRegister}>

                        <input  type="text"  name="name"  placeholder="Enter your name"
                            className="auth-input"   value={formData.name}  onChange={handleChange} />

                        <input  type="email" name= "email" placeholder="Enter your email" 
                            className="auth-input" value={formData.email}  onChange={handleChange} />

                        <input  type="password" name="password" placeholder="Enter your password"
                            className="auth-input" value={formData.password}  onChange={handleChange}  />

                        <button className="auth-button" >Create Account</button>

                    </form>

                    <p className="auth-switch">  Already have an account?{" "}
                       <button  className="auth-switch-button" onClick={() => setIsLogin(true)}>  Login  </button>
                    </p>
                </div>

            )}

    </div>

     )
};
 

export default Auth;