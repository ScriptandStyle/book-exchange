import React from 'react';
import '../styles/info-pages.css';

const Guidelines = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Community Guidelines</h1>
        <div className="legal-content">
          <section>
            <h2>1. Respect Others</h2>
            <p>
              Treat all members with kindness and respect. Harassment, hate speech, or 
              discriminatory behavior will not be tolerated.
            </p>
          </section>
          <section>
            <h2>2. Accurate Listings</h2>
            <p>
              Provide honest descriptions of your books' condition. Misrepresentation may 
              result in account restrictions.
            </p>
          </section>
          <section>
            <h2>3. Safe Exchanges</h2>
            <p>
              We recommend meeting in public places for exchanges or using tracked shipping. 
              BookSwap isn't responsible for lost or damaged items.
            </p>
          </section>
          <section>
            <h2>4. Appropriate Content</h2>
            <p>
              Only list books that are appropriate for a general audience. Controversial 
              materials should be clearly described.
            </p>
          </section>
          <section>
            <h2>5. Reporting Issues</h2>
            <p>
              If you encounter inappropriate behavior or content, please report it 
              immediately through our contact form.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;