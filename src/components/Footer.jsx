import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5 border-top mt-auto" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="container">
        <div className="row flex-column align-items-center">
          
          {/* Social Media Icons using Bootstrap Icon classes */}
          <div className="col d-flex justify-content-center gap-4 mb-4">
            <a href="https://www.facebook.com/profile.php?id=61587107678345" className="text-decoration-none" target="_blank" rel="noreferrer">
              <i className="bi bi-facebook fs-4" style={{ color: 'var(--stone-blue)' }}></i>
            </a>
            <a href="https://linkedin.com" className="text-decoration-none" target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin fs-4" style={{ color: 'var(--stone-blue)' }}></i>
            </a>
            <a href="https://twitter.com" className="text-decoration-none" target="_blank" rel="noreferrer">
              <i className="bi bi-twitter-x fs-4" style={{ color: 'var(--stone-blue)' }}></i>
            </a>
            <a href="mailto:contact@elderstone.com" className="text-decoration-none">
              <i className="bi bi-envelope-fill fs-4" style={{ color: 'var(--stone-blue)' }}></i>
            </a>
          </div>

          {/* Copyright Text */}
          <div className="col text-center">
            <p className="mb-1 fw-bold" style={{ color: 'var(--stone-blue)' }}>
              ELDERSTONE Digital Solutions, LLC
            </p>
            <p className="small opacity-75" style={{ color: 'var(--text-main)' }}>
              &copy; {currentYear} All Rights Reserved.  |  <Link to="/privacy" className="opacity-75 text-decoration-none small" sytle={{ color: 'var(--link-color)' }} target="_blank">Privacy Policy</Link>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;