import React, { useState } from 'react';
import '../styles/info-pages.css';

const Help = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click 'Sign Up' in the top right corner and follow the prompts."
    },
    {
      question: "How do I list a book?",
      answer: "Go to 'Add Book' in your dashboard and fill out the book details."
    },
    {
      question: "How are exchanges arranged?",
      answer: "After finding a book you want, message the owner to arrange details."
    }
  ];

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Help Center</h1>
        <div className="help-content">
          <div className="help-tabs">
            <button 
              className={`tab-btn ${activeTab === 'getting-started' ? 'active' : ''}`}
              onClick={() => setActiveTab('getting-started')}
            >
              Getting Started
            </button>
            <button 
              className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
            <button 
              className={`tab-btn ${activeTab === 'troubleshooting' ? 'active' : ''}`}
              onClick={() => setActiveTab('troubleshooting')}
            >
              Troubleshooting
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'getting-started' && (
              <div className="getting-started">
                <h2>Welcome to BookSwap</h2>
                <ol>
                  <li>Create an account</li>
                  <li>List books you want to swap</li>
                  <li>Browse available books</li>
                  <li>Connect with other readers</li>
                  <li>Arrange exchanges</li>
                </ol>
              </div>
            )}
            
            {activeTab === 'faqs' && (
              <div className="faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'troubleshooting' && (
              <div className="troubleshooting">
                <h2>Common Issues</h2>
                <div className="issue">
                  <h3>Can't log in?</h3>
                  <p>Try resetting your password or contact support.</p>
                </div>
                <div className="issue">
                  <h3>Book not listed?</h3>
                  <p>Check your internet connection and try again.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;