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

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/medicines">Medicines</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>

        {/* AUTH BUTTONS */}
        <div className={`auth-buttons ${menuOpen ? 'active' : ''}`}>
          <Link to="/login">
            <Button type="light" text="Sign In" />
          </Link>
          <Link to="/signup">
            <Button type="dark" text="Sign Up" />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
