import { useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../context/AuthContext";

import {
  faBars,
  faMagnifyingGlass, faCartShopping,
  faHeart,
  faUser, faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import logo from "../assets/images/logo2.PNG";

function Navbar() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    const search = searchTerm.trim();

    if (search !== "") {
      navigate(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <img src={logo} alt="Flower Shop" />
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      
      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search flowers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

      </div>

      <div className="navbar-menu-button">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FontAwesomeIcon icon={faBars} />
          </button>

          {isMenuOpen && (
            <div className="menu-panel">

              <button onClick={() => setIsMenuOpen(false)}> 
                 <FontAwesomeIcon icon={faXmark} />  </button>

              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
               <FontAwesomeIcon icon={faCartShopping} />
               <span>Cart</span>
              </Link>

              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
               <FontAwesomeIcon icon={faHeart} />
               <span>Wishlist</span>
              </Link>

              <Link className="mobile-nav-link" to="/home" onClick={() => setIsMenuOpen(false)}>
                <span>Home</span>
              </Link>

              <Link className="mobile-nav-link" to="/shop" onClick={() => setIsMenuOpen(false)}>
                <span>Shop</span>
              </Link>

              <Link className="mobile-nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>
                <span>About</span>
              </Link>

              <Link className="mobile-nav-link" to="/contact" onClick={() => setIsMenuOpen(false)}>
                <span>Contact</span>
              </Link>

            {isLoggedIn ? (
              <>

                <button className="account-menu-button" 
                  onClick={() => setIsAccountOpen(!isAccountOpen)}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>My Account</span>
                  <span className="account-arrow">   {isAccountOpen ? "⌃" : "⌄"}  </span>
                </button>

                {isAccountOpen && (
                  <div className="account-submenu">

                    <Link to="/my-orders" onClick={() => setIsMenuOpen(false)}>  My Orders  </Link>

                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>  Profile  </Link>

                    <button onClick={() => {
                       localStorage.removeItem("token");
                       setIsMenuOpen(false);
                       setIsLoggedIn(false);
                       setIsAccountOpen(false);
                       navigate("/");
                      }}>  Logout  </button>

                  </div>
                )}

            </>
        ) : (
          <Link to="/"  onClick={() => setIsMenuOpen(false)}  >
             <FontAwesomeIcon icon={faUser} />
             <span>Login</span>
          </Link>
      )}

            </div>
          )}
      </div>
    </nav>
  );
}

export default Navbar;