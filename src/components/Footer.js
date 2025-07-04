import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

// Import SVG icons
import BookIcon from '../assets/icons/book-open.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import TwitterIcon from '../assets/icons/twitter.svg';
import InstagramIcon from '../assets/icons/instagram.svg';
import GoodreadsIcon from '../assets/icons/goodreads.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/" className="footer-logo-link">
            BookSwap <img src={BookIcon} alt="Book icon" className="footer-icon" />
          </Link>
          <p className="footer-tagline">
            Connecting readers, one book at a time
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={FacebookIcon} alt="Facebook" className="social-icon-img" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={TwitterIcon} alt="Twitter" className="social-icon-img" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={InstagramIcon} alt="Instagram" className="social-icon-img" />
            </a>
            <a href="https://goodreads.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={GoodreadsIcon} alt="Goodreads" className="social-icon-img" />
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h3 className="footer-title">Explore</h3>
            <ul>
              <li><Link to="/browse">Browse Books</Link></li>
              <li><Link to="/add-book">Add a Book</Link></li>
              <li><Link to="/my-books">My Books</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Legal</h3>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/guidelines">Community Guidelines</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookSwap. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;