const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Good', 'Acceptable']
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150x200'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'On Exchange', 'Not Available'],
    default: 'Available'
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
