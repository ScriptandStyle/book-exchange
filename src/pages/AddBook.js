import React, { useState } from 'react';
import '../styles/forms.css';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    condition: 'Good',
    description: '',
    image: null,
    previewImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookData(prev => ({
          ...prev,
          image: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Book data submitted:', bookData);
    alert('Book added successfully!');
    // Reset form
    setBookData({
      title: '',
      author: '',
      isbn: '',
      genre: '',
      condition: 'Good',
      description: '',
      image: null,
      previewImage: null
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Add a New Book</h1>
        <p>Share a book with our community of readers</p>
      </div>
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Book Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              placeholder="Enter book title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author*</label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="isbn">ISBN (optional)</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN if known"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="genre">Genre*</label>
            <select
              id="genre"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select a genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="condition">Condition*</label>
            <select
              id="condition"
              name="condition"
              value={bookData.condition}
              onChange={handleChange}
              required
            >
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              required
              placeholder="Tell us about the book (condition, why you're sharing it, etc.)"
              rows="5"
            ></textarea>
          </div>
          
          <div className="form-group image-upload">
            <label htmlFor="image">Book Cover Image</label>
            <div className="upload-container">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="image" className="upload-btn">
                <i className="fas fa-camera"></i> Choose Image
              </label>
              {bookData.previewImage && (
                <div className="image-preview">
                  <img src={bookData.previewImage} alt="Book preview" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-btn">
          Add Book to Exchange
        </button>
      </form>
    </div>
  );
};

export default AddBook;