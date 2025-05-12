// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Find Your Paws</Link>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? '×' : '☰'}
      </button>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/pets" onClick={toggleMenu}>Pets</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;