import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg border-bottom px-4 py-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img src={darkMode ? "/images/dark-logo.png" : "/images/light-logo.png"} alt="Elderstone" height="40" className="me-2" />
          <span style={{ color: 'var(--stone-blue)' }}>ELDERSTONE Digital Solutions, LLC</span>
        </Link>
        <div className="navbar-nav ms-auto d-flex align-items-center gap-3">
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/services">Services</Link>
          <Link className="nav-link" to ="/contact">Contact</Link>
          <Link className="nav-link" to="/billing">Billing</Link>
          <button className="btn btn-link p-0 ms-2" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun color="#F9FAFB" /> : <Moon color="#1F3A5F" />}
          </button>
        </div>
      </div>
    </nav>
  );
}