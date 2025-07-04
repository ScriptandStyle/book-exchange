const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  phone: {
    type: String,
    trim: true
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  exchangePreferences: {
    type: String,
    enum: ['Any', 'Same Genre', 'Same Author', 'Same Condition']
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
