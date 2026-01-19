import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom px-4 py-3 position-relative" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" onClick={closeMenu}>
          <img src={darkMode ? "/images/dark-logo.png" : "/images/light-logo.png"} alt="Elderstone" height="40" className="me-2" />
          <span style={{ color: 'var(--stone-blue)' }} className="brand-text">ELDERSTONE Digital Solutions, LLC</span>
        </Link>
        <button className="navbar-toggle btn btn-link p-0 ms-auto" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={24} style={{ color: 'var(--stone-blue)' }} /> : <Menu size={24} style={{ color: 'var(--stone-blue)' }} />}
        </button>
        <div className={`navbar-menu ${menuOpen ? 'menu-open' : ''}`}>
          <Link className="nav-link" to="/about" onClick={closeMenu}>About</Link>
          <Link className="nav-link" to="/services" onClick={closeMenu}>Services</Link>
          <Link className="nav-link" to="/contact" onClick={closeMenu}>Contact</Link>
          <Link className="nav-link" to="/billing" onClick={closeMenu}>Billing</Link>
          <button className="btn btn-link p-0" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Sun color="#F9FAFB" size={20} /> : <Moon color="#1F3A5F" size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}