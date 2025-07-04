import React from 'react';
import '../styles/info-pages.css';

const Terms = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Terms of Service</h1>
        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using BookSwap, you agree to these Terms of Service and our Privacy Policy. 
              If you don't agree, please don't use our services.
            </p>
          </section>
          <section>
            <h2>2. User Responsibilities</h2>
            <p>
              You're responsible for all content you post and interactions with other users. 
              You must be at least 13 years old to use our services.
            </p>
          </section>
          <section>
            <h2>3. Book Exchanges</h2>
            <p>
              BookSwap facilitates connections between users but isn't responsible for the 
              condition of books or the actions of users. Exchanges are between users directly.
            </p>
          </section>
          <section>
            <h2>4. Prohibited Content</h2>
            <p>
              You may not list or request illegal, harmful, or inappropriate materials. 
              We reserve the right to remove any content that violates our guidelines.
            </p>
          </section>
          <section>
            <h2>5. Termination</h2>
            <p>
              We may suspend or terminate accounts that violate these terms. You may 
              delete your account at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;