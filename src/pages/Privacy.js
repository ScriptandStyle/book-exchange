import React from 'react';
import '../styles/info-pages.css';

const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Privacy Policy</h1>
        <div className="legal-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide when creating an account, listing books, 
              or communicating with other users. This may include your name, email address, 
              and book preferences.
            </p>
          </section>
          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              Your information is used to facilitate book exchanges, improve our services, 
              and communicate with you. We do not sell your personal data to third parties.
            </p>
          </section>
          <section>
            <h2>3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. 
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>
          <section>
            <h2>4. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. We'll notify you of significant changes 
              through email or a notice on our website.
            </p>
          </section>
          <p className="effective-date">
            <strong>Effective Date:</strong> January 1, 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;