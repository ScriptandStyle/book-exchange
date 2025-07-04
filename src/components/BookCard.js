import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bookcard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.image || 'https://via.placeholder.com/150x200'} alt={book.title} />
        <div className="book-actions">
          <button className="action-btn wishlist-btn">
            <i className="far fa-heart"></i>
          </button>
          <button className="action-btn exchange-btn">
            <i className="fas fa-exchange-alt"></i>
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-meta">
          <span className="book-condition">{book.condition}</span>
          <span className="book-location">
            <i className="fas fa-map-marker-alt"></i> {book.location}
          </span>
        </div>
        <Link to={`/book/${book.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;