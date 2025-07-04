import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

// Import SVG icons
import ExchangeIcon from '../assets/icons/exchange.svg';
import SearchIcon from '../assets/icons/search.svg';
import CommunityIcon from '../assets/icons/community.svg';

// Import book cover images (replace with your actual images)
import Book1 from '../assets/book-covers/book1.jpeg';
import Book2 from '../assets/book-covers/book2.jpeg';
import Book3 from '../assets/book-covers/book3.jpeg';
import Book4 from '../assets/book-covers/book4.jpeg';

const Home = () => {
  // Sample trending books data
  const trendingBooks = [
    {
      id: 1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      cover: Book1
    },
    {
      id: 2,
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      cover: Book2
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: Book3
    },
    {
      id: 4,
      title: 'Educated',
      author: 'Tara Westover',
      cover: Book4
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover & Exchange Books</h1>
          <p>Connect with readers worldwide and exchange your favorite books</p>
          <div className="hero-buttons">
            <Link to="/browse" className="hero-btn browse-btn">Browse Books</Link>
            <Link to="/add-book" className="hero-btn add-btn">Add Your Book</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose BookSwap?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={ExchangeIcon} alt="Exchange icon" className="feature-icon" />
            <h3>Easy Exchange</h3>
            <p>Swap books with other readers with just a few clicks</p>
          </div>
          <div className="feature-card">
            <img src={SearchIcon} alt="Search icon" className="feature-icon" />
            <h3>Vast Collection</h3>
            <p>Discover thousands of books across all genres</p>
          </div>
          <div className="feature-card">
            <img src={CommunityIcon} alt="Community icon" className="feature-icon" />
            <h3>Community</h3>
            <p>Connect with fellow book lovers worldwide</p>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <h2>Trending This Week</h2>
        <div className="trending-books">
          {trendingBooks.map(book => (
            <div className="trending-book" key={book.id}>
              <img src={book.cover} alt={`${book.title} cover`} className="book-cover" />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
        <Link to="/browse" className="view-all-btn">View All Books</Link>
      </section>
    </div>
  );
};

export default Home;