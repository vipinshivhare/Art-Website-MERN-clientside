import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside or when interacting with other elements
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Close mobile menu when focusing on input fields
    const handleFocusIn = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('focusin', handleFocusIn);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={`navbar ${isScrolled ? 'floating' : ''}`}>
      <div className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link to="/" onClick={closeMobileMenu}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Link to="/" onClick={() => {setMenu("home"); closeMobileMenu()}} 
          className={menu === "home" ? "active" : ""}>
          home
        </Link>
        <a href="#explore-menu" onClick={() => {setMenu("menu"); closeMobileMenu()}} 
          className={menu === "menu" ? "active" : ""}>
          menu
        </a>
        <a href="#app-download" onClick={() => {setMenu("mobile-app"); closeMobileMenu()}} 
          className={menu === "mobile-app" ? "active" : ""}>
          mobile-app
        </a>
        <a href="#footer" onClick={() => {setMenu("contact-us"); closeMobileMenu()}} 
          className={menu === "contact-us" ? "active" : ""}>
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart" onClick={closeMobileMenu}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={(function () {
            try {
              return getTotalCartAmount() > 0 ? "dot" : "";
            } catch (error) {
              console.error("Error calculating cart amount:", error);
              return "";
            }
          })()}></div>
        </div>
        {!token ? (
          <button onClick={() => {
            console.log("Sign in button clicked")
            console.log("setShowLogin function:", setShowLogin)
            setShowLogin(true)
            closeMobileMenu()
          }}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => {navigate("/myorders"); closeMobileMenu()}}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => {logout(); closeMobileMenu()}}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
