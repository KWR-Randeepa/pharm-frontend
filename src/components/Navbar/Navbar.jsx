import React, { useState } from 'react';
import './Navbar.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <a href="/" className="logo">MediFind</a>

        {/* HAMBURGER ICON */}
        <div 
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>


        {/* AUTH BUTTONS */}
        <div className={`auth-buttons ${menuOpen ? 'active' : ''}`}>
          <Link to="/login">
            <Button type="light" text="Log In" />
          </Link>
          <Link to="/pharmacy-registration">
            <Button type="dark" text="Sign Up" />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
