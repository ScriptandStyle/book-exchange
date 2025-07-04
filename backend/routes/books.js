const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file upload
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 1000000 // 1MB limit
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ status: 'Available' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new book
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      owner: req.user._id,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
