import React from 'react';
import '../styles/info-pages.css';
import AboutImage from '../assets/images/about.jpeg';

const About = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>About BookSwap</h1>
        <div className="content-section">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              BookSwap was founded in 2023 with a simple mission: to connect book lovers 
              and make reading more accessible. We believe every book deserves to be read 
              by someone who will cherish it.
            </p>
            <h2>How It Works</h2>
            <p>
              Our platform allows you to list books you're ready to part with and find 
              new ones you'd love to read. Simply create an account, add your books, and 
              start swapping!
            </p>
            <h2>Our Team</h2>
            <p>
              We're a small team of book enthusiasts, developers, and designers who 
              are passionate about creating meaningful connections through literature.
            </p>
          </div>
          <div className="image-content">
            <img src={AboutImage} alt="People reading books" className="about-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;