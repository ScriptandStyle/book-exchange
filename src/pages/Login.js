import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import GoogleIcon from '../assets/icons/google.svg';
import FacebookIcon from '../assets/icons/facebook.svg';

// Mock user for testing
const MOCK_USER = {
  _id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  location: 'Test City',
  bio: 'This is a test user account',
  avatar: 'https://via.placeholder.com/150'
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simple mock login logic
    if (formData.email === MOCK_USER.email && formData.password === 'password') {
      // Create mock token
      const token = 'mock-token-1';
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      
      // Redirect to home page
      navigate('/');
    } else {
      setError('Invalid email or password. Try using test@example.com and password "password"');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="form-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>
        </div>
        
        <div className="info-message">
          <strong>Demo Mode:</strong> Use email <code>test@example.com</code> and password <code>password</code>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </form>
        
        <div className="social-login">
          <p>Or sign in with</p>
          <div className="social-buttons">
            <button type="button" className="social-btn google-btn">
              <img src={GoogleIcon} alt="Google" className="social-icon" />
              Google
            </button>
            <button type="button" className="social-btn facebook-btn">
              <img src={FacebookIcon} alt="Facebook" className="social-icon" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;