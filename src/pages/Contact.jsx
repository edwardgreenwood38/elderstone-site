import React, { useEffect } from 'react';

const Contact = ({ darkMode, setDarkMode}) => {
  useEffect(() => {
    // Read theme from query parameter
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    
    if (themeParam === 'dark' && !darkMode) {
      setDarkMode(true);
    } else if (themeParam === 'light' && darkMode) {
      setDarkMode(false);
    }
  }, [darkMode, setDarkMode]);

  return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="p-5 rounded shadow-lg" style={{ backgroundColor: 'var(--bg-card)', borderTop: '4px solid var(--copper)' }}>
          <h2 className="fw-bold mb-4">Let's Build Something Solid</h2>
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Work Email</label>
              <input type="email" className="form-control" placeholder="john@company.com" />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Desired Plan</label>
              <select className="form-select">
                <option>Starter ($149/mo)</option>
                <option>Growth ($249/mo)</option>
                <option>Pro ($399/mo)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">Message</label>
              <textarea className="form-control" rows="4" placeholder="Tell us about your project..."></textarea>
            </div>
            <button className="btn btn-lg w-100 fw-bold" style={{ backgroundColor: 'var(--stone-blue)', color: 'white' }}>
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Contact;