import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BookSwap <i className="fas fa-book-open"></i>
        </Link>
        
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/browse" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Browse Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-book" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Add Book
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/my-books" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              My Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
          </li>
        </ul>
        
        <div className="nav-auth">
          <Link to="/login" className="nav-auth-btn login-btn">Login</Link>
          <Link to="/register" className="nav-auth-btn register-btn">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;