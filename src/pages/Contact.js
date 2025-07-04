import React, { useState } from 'react';
import '../styles/info-pages.css';
import '../styles/forms.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Contact Us</h1>
        <div className="content-section">
          <div className="text-content">
            <h2>Get in Touch</h2>
            <p>
              Have questions or feedback? We'd love to hear from you! Fill out the form 
              below or reach out through our social media channels.
            </p>
            <div className="contact-methods">
              <div className="contact-item">
                <h3>Email</h3>
                <p>support@bookswap.com</p>
              </div>
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <h3>Address</h3>
                <p>123 Book Street, Library City, LC 12345</p>
              </div>
            </div>
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;