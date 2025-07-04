/**
 * API Service for Book Exchange App
 * Handles all API requests with consistent error handling and authentication
 */

// Base URL for all API requests
const API_URL = 'http://localhost:5000/api';

// Enable mock mode when backend is not available
const USE_MOCK_DATA = true;

// Mock user data for testing
const MOCK_USERS = [
  {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User',
    location: 'Test City',
    bio: 'This is a test user account',
    avatar: 'https://via.placeholder.com/150',
    books: [],
    wishlist: [],
    lastActive: new Date().toISOString()
  }
];

// Simple function to check if the API is reachable
export const checkApiConnection = async () => {
  if (USE_MOCK_DATA) {
    console.log('Using mock data mode - no backend connection required');
    return true;
  }
  
  try {
    const response = await fetch(`${API_URL}/test`);
    return response.ok;
  } catch (error) {
    console.error('API Connection Error:', error);
    return false;
  }
};

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - API response
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    // Check API connection first
    const isConnected = await checkApiConnection();
    if (!isConnected) {
      throw new Error('Cannot connect to the server. Please check your connection.');
    }
    
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Use XMLHttpRequest instead of fetch for better error handling
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || 'GET', `${API_URL}${endpoint}`);
      
      // Set headers
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      
      xhr.onload = function() {
        if (xhr.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          reject(new Error('Your session has expired. Please log in again.'));
        } else if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            reject(new Error('Invalid response from server'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData.error || 'An error occurred'));
          } catch (e) {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error occurred'));
      };
      
      xhr.ontimeout = function() {
        reject(new Error('Request timed out'));
      };
      
      // Send the request
      if (options.body) {
        xhr.send(options.body);
      } else {
        xhr.send();
      }
    });
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Authentication API calls
 */
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Registering user', userData);
      
      // Check if email is already in use
      if (MOCK_USERS.some(user => user.email === userData.email)) {
        throw new Error('Email is already in use');
      }
      
      // Check if username is already in use
      if (MOCK_USERS.some(user => user.username === userData.username)) {
        throw new Error('Username is already in use');
      }
      
      // Create new user
      const newUser = {
        _id: String(MOCK_USERS.length + 1),
        ...userData,
        books: [],
        wishlist: [],
        lastActive: new Date().toISOString()
      };
      
      // Add to mock users
      MOCK_USERS.push(newUser);
      
      // Return user data and token
      return {
        user: { ...newUser },
        token: 'mock-token-' + newUser._id
      };
    }
    
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  // Login a user
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Logging in user', credentials);
      
      // Find user by email
      const user = MOCK_USERS.find(user => user.email === credentials.email);
      
      // Check if user exists and password is correct
      if (!user || credentials.password !== 'password') {
        // For mock mode, any password 'password' works
        throw new Error('Invalid credentials');
      }
      
      // Return user data and token
      return {
        user: { ...user },
        token: 'mock-token-' + user._id
      };
    }
    
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  // Get current user data
  getCurrentUser: async () => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Getting current user');
      
      // Get user ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const userId = token.replace('mock-token-', '');
      const user = MOCK_USERS.find(user => user._id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return { ...user };
    }
    
    return apiRequest('/auth/me');
  }
};

/**
 * User API calls
 */
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Getting user profile');
      
      // Get user ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const userId = token.replace('mock-token-', '');
      const user = MOCK_USERS.find(user => user._id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return { ...user };
    }
    
    return apiRequest('/users/profile');
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Updating user profile', profileData);
      
      // Get user ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const userId = token.replace('mock-token-', '');
      const userIndex = MOCK_USERS.findIndex(user => user._id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user data
      MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        ...profileData,
        lastActive: new Date().toISOString()
      };
      
      return { ...MOCK_USERS[userIndex] };
    }
    
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },
  
  // Get user's books
  getUserBooks: async (username) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Getting user books', username);
      
      const user = MOCK_USERS.find(user => user.username === username);
      if (!user) {
        throw new Error('User not found');
      }
      
      return user.books || [];
    }
    
    return apiRequest(`/users/${username}/books`);
  },
  
  // Get user's wishlist
  getWishlist: async (username) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Getting user wishlist', username);
      
      const user = MOCK_USERS.find(user => user.username === username);
      if (!user) {
        throw new Error('User not found');
      }
      
      return user.wishlist || [];
    }
    
    return apiRequest(`/users/${username}/wishlist`);
  },
  
  // Add book to wishlist
  addToWishlist: async (bookId) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Adding book to wishlist', bookId);
      
      // Get user ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const userId = token.replace('mock-token-', '');
      const userIndex = MOCK_USERS.findIndex(user => user._id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Add book to wishlist if not already there
      if (!MOCK_USERS[userIndex].wishlist.includes(bookId)) {
        MOCK_USERS[userIndex].wishlist.push(bookId);
      }
      
      return { ...MOCK_USERS[userIndex] };
    }
    
    return apiRequest(`/users/wishlist/${bookId}`, {
      method: 'POST'
    });
  },
  
  // Remove book from wishlist
  removeFromWishlist: async (bookId) => {
    if (USE_MOCK_DATA) {
      console.log('MOCK: Removing book from wishlist', bookId);
      
      // Get user ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const userId = token.replace('mock-token-', '');
      const userIndex = MOCK_USERS.findIndex(user => user._id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Remove book from wishlist
      MOCK_USERS[userIndex].wishlist = MOCK_USERS[userIndex].wishlist.filter(id => id !== bookId);
      
      return { ...MOCK_USERS[userIndex] };
    }
    
    return apiRequest(`/users/wishlist/${bookId}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Book API calls
 */
export const bookAPI = {
  // Get all books
  getAllBooks: () => {
    return apiRequest('/books');
  },
  
  // Get book by ID
  getBookById: (bookId) => {
    return apiRequest(`/books/${bookId}`);
  },
  
  // Add a new book
  addBook: (bookData) => {
    return apiRequest('/books', {
      method: 'POST',
      body: JSON.stringify(bookData)
    });
  },
  
  // Update a book
  updateBook: (bookId, bookData) => {
    return apiRequest(`/books/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify(bookData)
    });
  },
  
  // Delete a book
  deleteBook: (bookId) => {
    return apiRequest(`/books/${bookId}`, {
      method: 'DELETE'
    });
  }
};

// Test API connectivity
export const testAPI = {
  ping: async () => {
    try {
      return await apiRequest('/test');
    } catch (error) {
      console.error('API Ping Error:', error);
      return { error: true, message: error.message };
    }
  }
};

export default {
  auth: authAPI,
  user: userAPI,
  book: bookAPI,
  test: testAPI
};