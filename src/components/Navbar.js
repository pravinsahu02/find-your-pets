// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🐾 Find Your Paws</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/pets">Available Pets</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;