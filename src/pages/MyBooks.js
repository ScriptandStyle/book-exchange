import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import '../styles/browse.css';

const MyBooks = () => {
  const [activeTab, setActiveTab] = useState('listed');
  
  // Sample data - in a real app, this would come from your backend
  const listedBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      condition: 'Like New',
      location: 'New York, NY',
      image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Classic',
      condition: 'Good',
      location: 'Chicago, IL',
      image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
    }
  ];
  
  const requestedBooks = [
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      condition: 'Fair',
      location: 'Los Angeles, CA',
      image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
      requester: 'John Doe',
      status: 'Pending'
    }
  ];
  
  const exchangedBooks = [
    {
      id: 4,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      condition: 'Excellent',
      location: 'Seattle, WA',
      image: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
      exchangedWith: 'Jane Smith',
      date: '2023-05-15'
    }
  ];

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1>My Books</h1>
        <p>Manage your listed books and exchange requests</p>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'listed' ? 'active' : ''}`}
          onClick={() => setActiveTab('listed')}
        >
          Listed Books ({listedBooks.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requested' ? 'active' : ''}`}
          onClick={() => setActiveTab('requested')}
        >
          Requested ({requestedBooks.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'exchanged' ? 'active' : ''}`}
          onClick={() => setActiveTab('exchanged')}
        >
          Exchanged ({exchangedBooks.length})
        </button>
      </div>
      
      <div className="books-grid">
        {activeTab === 'listed' && (
          listedBooks.length > 0 ? (
            listedBooks.map(book => (
              <BookCard key={book.id} book={book} isOwner />
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-book-open"></i>
              <h3>You haven't listed any books yet</h3>
              <p>Add books to start exchanging</p>
            </div>
          )
        )}
        
        {activeTab === 'requested' && (
          requestedBooks.length > 0 ? (
            requestedBooks.map(book => (
              <div key={book.id} className="requested-book">
                <BookCard book={book} />
                <div className="request-details">
                  <p><strong>Requester:</strong> {book.requester}</p>
                  <p><strong>Status:</strong> <span className={`status-${book.status.toLowerCase()}`}>{book.status}</span></p>
                  <div className="request-actions">
                    <button className="action-btn accept-btn">Accept</button>
                    <button className="action-btn decline-btn">Decline</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-exchange-alt"></i>
              <h3>No pending requests</h3>
              <p>When someone requests your book, it will appear here</p>
            </div>
          )
        )}
        
        {activeTab === 'exchanged' && (
          exchangedBooks.length > 0 ? (
            exchangedBooks.map(book => (
              <div key={book.id} className="exchanged-book">
                <BookCard book={book} />
                <div className="exchange-details">
                  <p><strong>Exchanged with:</strong> {book.exchangedWith}</p>
                  <p><strong>Date:</strong> {book.date}</p>
                  <button className="action-btn review-btn">Leave Review</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-handshake"></i>
              <h3>No completed exchanges yet</h3>
              <p>Your completed exchanges will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyBooks;