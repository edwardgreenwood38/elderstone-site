import React from 'react';
import useSEO from '../hooks/useSEO';

const About = ({ darkMode, setDarkMode }) => {
  // 1. Call the SEO hook with page-specific metadata
  useSEO({
    title: 'Our Infrastructure Promise',
    description: 'Learn how Elderstone Digital handles the technical heavy lifting—from server optimization to security—so you can focus on your business.',
    image: '/images/about-share-preview.jpg', // Ensure this image is in your public folder
    url: window.location.href,
    type: 'website'
  });

  return (
    <div className="container py-5">
      <div className="row align-items-center py-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--stone-blue)' }}>
            Stability for the Modern Web
          </h1>
          <p className="lead mb-4" style={{ color: 'var(--text-main)' }}>
            At Elderstone Digital Solutions, we believe your website should be an asset, not a source of stress.
          </p>
          <p style={{ color: 'var(--text-main)', opacity: 0.7 }}>
            Our team specializes in creating managed digital ecosystems. We handle the technical "heavy lifting"—from server optimization to zero-day security patches—ensuring your business stays online and performs at its peak 24/7.
          </p>
        </div>

        <div className="col-lg-6 mt-4 mt-lg-0 text-center">
          <div className="p-5 rounded shadow-sm" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h4 className="fw-bold" style={{ color: 'var(--copper)' }}>The Elderstone Promise</h4>
            <p className="mb-0 italic" style={{ color: 'var(--text-main)' }}>
              "Infrastructure built to last. Support designed to scale."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;