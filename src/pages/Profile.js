import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: '',
    name: '',
    email: '',
    location: '',
    bio: '',
    avatar: 'https://via.placeholder.com/150',
    previewAvatar: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          previewAvatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if user is logged in and fetch profile data
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Get user data directly from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (storedUser && storedUser.username) {
        setProfileData({
          username: storedUser.username || '',
          name: storedUser.name || '',
          email: storedUser.email || '',
          location: storedUser.location || '',
          bio: storedUser.bio || 'No bio available',
          avatar: storedUser.avatar || 'https://via.placeholder.com/150',
          previewAvatar: null
        });
      } else {
        setError('Unable to load profile. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Profile load error:', err);
      setError('Unable to load profile. Please log in again.');
      setTimeout(() => navigate('/login'), 2000);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!localStorage.getItem('token')) {
        navigate('/login');
        return;
      }
      
      // Get current user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Update user data
      const updatedUser = {
        ...storedUser,
        name: profileData.name,
        location: profileData.location,
        bio: profileData.bio,
        lastActive: new Date().toISOString()
      };
      
      // If there's a new avatar, update it
      if (profileData.previewAvatar) {
        updatedUser.avatar = profileData.previewAvatar;
        setProfileData(prev => ({
          ...prev,
          avatar: prev.previewAvatar,
          previewAvatar: null
        }));
      }
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Simulate API delay
      setTimeout(() => {
        setIsEditing(false);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  if (isLoading) {
    return (
      <div className="form-container profile-container">
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }
  
  return (
    <div className="form-container profile-container">
      <div className="form-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
        <button 
          className="logout-btn" 
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
      
      <div className="info-message">
        <strong>Demo Mode:</strong> Profile data is stored locally
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-container">
            <img 
              src={profileData.previewAvatar || profileData.avatar} 
              alt="Profile" 
              className="profile-avatar"
            />
            {isEditing && (
              <div className="avatar-upload">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar" className="upload-btn">
                  <i className="fas fa-camera"></i> Change Photo
                </label>
              </div>
            )}
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <h3>24</h3>
              <p>Books Listed</p>
            </div>
            <div className="stat-item">
              <h3>15</h3>
              <p>Exchanges</p>
            </div>
            <div className="stat-item">
              <h3>4.8</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>
        
        <div className="profile-main">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <h2>{profileData.name}</h2>
              <p className="profile-username">@{profileData.username}</p>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-location">
                <i className="fas fa-map-marker-alt"></i> {profileData.location}
              </p>
              
              <div className="profile-bio">
                <h3>About Me</h3>
                <p>{profileData.bio}</p>
              </div>
              
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;