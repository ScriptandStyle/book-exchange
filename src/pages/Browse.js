import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import '../styles/browse.css';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  
  // Sample data - in a real app, this would come from your backend
  const books = [
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
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      condition: 'Fair',
      location: 'Los Angeles, CA',
      image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 4,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      condition: 'Excellent',
      location: 'Seattle, WA',
      image: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      condition: 'Good',
      location: 'Boston, MA',
      image: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Literary Fiction',
      condition: 'Fair',
      location: 'Austin, TX',
      image: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg'
    }
  ];

  const genres = ['All', 'Classic', 'Dystopian', 'Fantasy', 'Romance', 'Literary Fiction', 'Science Fiction', 'Mystery'];
  const conditions = ['All', 'Like New', 'Excellent', 'Good', 'Fair', 'Poor'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesCondition = selectedCondition === 'all' || book.condition === selectedCondition;
    
    return matchesSearch && matchesGenre && matchesCondition;
  });

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1>Browse Available Books</h1>
        <p>Find your next read from our community of book lovers</p>
      </div>
      
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label htmlFor="genre">Genre:</label>
            <select 
              id="genre" 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map(genre => (
                <option key={genre} value={genre === 'All' ? 'all' : genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="condition">Condition:</label>
            <select 
              id="condition" 
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              {conditions.map(condition => (
                <option key={condition} value={condition === 'All' ? 'all' : condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-book-open"></i>
            <h3>No books found matching your criteria</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;