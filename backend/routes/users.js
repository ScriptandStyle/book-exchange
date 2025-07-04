const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const multer = require('multer');

// Configure multer for avatar upload
const upload = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 500000 // 500KB limit
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('books')
      .populate('wishlist');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get public user profile
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('books')
      .populate('wishlist');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'location', 'bio', 'phone', 'exchangePreferences'];
    
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }

    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload user avatar
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    req.user.avatar = `/uploads/avatars/${req.file.filename}`;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's books
router.get('/:username/books', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const books = await Book.find({ owner: user._id })
      .sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's wishlist
router.get('/:username/wishlist', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const wishlist = await Book.find({ _id: { $in: user.wishlist } })
      .sort({ createdAt: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add book to wishlist
router.post('/wishlist/:bookId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if book is already in wishlist
    if (user.wishlist.includes(req.params.bookId)) {
      return res.status(400).json({ error: 'Book already in wishlist' });
    }

    user.wishlist.push(req.params.bookId);
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove book from wishlist
router.delete('/wishlist/:bookId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.bookId);
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's exchange history
router.get('/:username/exchanges', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find books that were exchanged (status changed from Available to On Exchange)
    const exchanges = await Book.find({
      $or: [
        { owner: user._id, status: 'On Exchange' },
        { owner: user._id, status: 'Not Available' }
      ]
    })
    .sort({ updatedAt: -1 });

    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update exchange preferences
router.put('/profile/preferences', auth, async (req, res) => {
  try {
    const { exchangePreferences } = req.body;
    if (!exchangePreferences) {
      return res.status(400).json({ error: 'Exchange preferences required' });
    }

    req.user.exchangePreferences = exchangePreferences;
    await req.user.save();
    
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
